import axios from "axios";

export const toggleRetweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string | undefined;
  userId: string | undefined;
}) => {
  try {
    const { data } = await axios.post("/api/tweets/retweets", {
      tweet_id: tweetId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.message;
  }
};
