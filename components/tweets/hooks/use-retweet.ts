import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleRetweet } from "../api/toggleRetweet";
import { updateRetweetCache } from "../actions/update-tweet-cache";

// 检查是否为开发模式
const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

export const useRetweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
    }: {
      tweetId: string | undefined;
      userId: string | undefined;
    }) => {
      if (isDevMode) {
        // 开发模式：返回模拟数据
        return {
          message: "Retweeted",
          retweeted: true,
        };
      }
      // 生产模式：调用真实API
      return toggleRetweet({ tweetId, userId });
    },

    onSuccess: (_, { tweetId, userId }) => {
      if (!tweetId || !userId) return;
      updateRetweetCache(queryClient, tweetId, userId);
    },

    onError: (error) => {
      console.log("Error retweeting:", error);
    },
  });
};
