import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleRetweet } from "../api/toggleRetweet";
import { updateRetweetCache } from "../actions/update-tweet-cache";

export const useRetweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
    }: {
      tweetId: string | undefined;
      userId: string;
    }) => {
      return toggleRetweet({ tweetId, userId });
    },

    onSuccess: (_, { tweetId, userId }) => {
      if (!tweetId || !userId) return;
      updateRetweetCache(queryClient, tweetId, userId);
    },

    onError: () => {
      console.log("error");
    },
  });
};
