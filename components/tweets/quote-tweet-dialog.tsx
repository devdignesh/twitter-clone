import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import CreateTweet from "../create-tweet/create-tweet";
import useQuoteTweetStore from "@/components/tweets/store/use-quote-tweet-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { highlightHashtags } from "@/components/tweets/highlight-hashtags";
import TweetMedia from "@/components/tweets/tweet-media";
import useDevModeStore from "@/components/dev-mode/store/use-dev-mode-store";
import useDevTweetStore from "@/components/dev-mode/store/use-dev-tweet-store";

const QuoteTweetDialog = () => {
  const quoteTweetDialog = useQuoteTweetStore();
  const tweet = quoteTweetDialog.tweet;
  const [text, setText] = useState("");
  const devMode = useDevModeStore();
  const devTweetStore = useDevTweetStore();

  if (!tweet) return null;

  const createdAt = tweet?.createdAt
    ? formatDistanceToNowStrict(new Date(tweet.createdAt))
    : null;

  const handleQuoteTweet = () => {
    if (devMode.isEnabled) {
      devTweetStore.addQuoteTweet(tweet.id, text);
      quoteTweetDialog.onClose();
      setText("");
    }
  };

  return (
    <Dialog open={quoteTweetDialog.isOpen} onOpenChange={quoteTweetDialog.onClose}>
      <DialogContent
        overlayClassName="bg-slate-500/30"
        className="p-0 pb-4 max-w-[600px] max-h-[90vh] h-fit rounded-2xl overflow-y-auto top-[15%]"
      >
        <DialogHeader className="p-4 pb-0 flex flex-row justify-between text-center items-center gap-2">
          <div className="flex flex-row text-center items-center space-x-4">
            <Cross2Icon
              className="h-5 w-5 cursor-pointer"
              onClick={() => quoteTweetDialog.onClose()}
            />
          </div>
        </DialogHeader>

        <div className="px-4 py-2">
          <div className="w-full space-y-3">
            <div className="overflow-x-hidden overflow-y-auto w-full max-h-[320px]">
              <textarea
                placeholder="Add a comment..."
                value={text}
                className="border-none placeholder:text-light-gray px-0 h-0 resize-none shadow-none text-base focus:border-none focus:outline-none focus-visible:outline-none outline-none active:border-none focus-visible:border-none w-full"
                onChange={(e) => setText(e.target.value)}
                style={{ height: '60px' }}
              />
            </div>

            <div className="flex flex-wrap items-center">
              <div className="flex items-center gap-2">
                <button
                  disabled={!devMode.isEnabled && (!text || text.length > 90)}
                  onClick={handleQuoteTweet}
                  className="px-6 w-fit bg-sky-500 text-white font-semibold py-2 px-4 rounded-full"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-12 mb-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="p-4">
            <div className="flex flex-row gap-3 w-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={
                    tweet?.user?.profileImage || `/images/user_placeholder.png`
                  }
                />
              </Avatar>

              <div className="w-full">
                <div className="flex flex-row items-center gap-2">
                  <span className="font-semibold text-sm">
                    {tweet?.user?.name}
                  </span>
                  <span className="text-sm text-light-gray">
                    @{tweet?.user?.username}
                  </span>
                  {createdAt && (
                    <span className="text-xs sm:text-sm text-light-gray">
                      · {createdAt} ago
                    </span>
                  )}
                </div>

                {tweet?.body && (
                  <div className="mt-1 text-sm">
                    {highlightHashtags(tweet?.body)}
                  </div>
                )}

                {tweet?.media?.length > 0 && (
                  <div className="mt-2">
                    <TweetMedia media={tweet?.media} tweet_id={tweet?.id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteTweetDialog;
