import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  try {
    const existingRetweet = await prisma.retweet.findFirst({
      where: {
        userId: user_id,
        postId: tweet_id,
      },
    });

    const result = await prisma.$transaction(async (tx) => {
      if (existingRetweet) {
        await tx.retweet.delete({
          where: {
            id: existingRetweet.id,
          },
        });

        await tx.post.update({
          where: { id: tweet_id },
          data: { retweet_count: { decrement: 1 } },
        });

        return { message: "Undo retweet", retweeted: false };
      } else {
        await tx.retweet.create({
          data: {
            userId: user_id,
            postId: tweet_id,
          },
        });

        await tx.post.update({
          where: { id: tweet_id },
          data: { retweet_count: { increment: 1 } },
        });

        return { message: "Retweeted", retweeted: true };
      }
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error retweeting:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: error.errorCode || 500 }
    );
  }
}
