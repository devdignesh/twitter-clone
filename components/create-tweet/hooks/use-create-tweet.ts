import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostTweet } from "../api/post-tweet";
import { IChosenImages } from "../type/inde";
import useCreateTweetStore from "@/components/sidebar/store/useCreateTweetStore";
import useQuoteTweetStore from "@/components/tweets/store/use-quote-tweet-store";

export const useCreateTweet = ({
  setText,
  setChosenImages,
}: {
  setText: (text: string) => void;
  setChosenImages: (chosenImages: IChosenImages[]) => void;
}) => {
  const queryClient = useQueryClient();
  const createTweetDialog = useCreateTweetStore();
  const quoteTweetDialog = useQuoteTweetStore();

  return useMutation({
    mutationFn: ({
      text,
      userId,
      files,
      in_reply_to_screen_name,
      in_reply_to_tweet_id,
      quote_from_tweet_id,
    }: {
      text: string;
      userId: string;
      files: File[];
      in_reply_to_screen_name?: string | null;
      in_reply_to_tweet_id?: string | null;
      quote_from_tweet_id?: string | null;
    }) => {
      return PostTweet({
        text,
        userId,
        files,
        in_reply_to_screen_name,
        in_reply_to_tweet_id,
        quote_from_tweet_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["hashtags"] });
      queryClient.invalidateQueries({ queryKey: ["hashtags-dialog"] });
      createTweetDialog.onClose();
      quoteTweetDialog.onClose();
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSettled: () => {
      setText("");
      setChosenImages([]);
    },
  });
};
