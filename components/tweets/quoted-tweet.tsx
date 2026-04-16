import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { ITweet } from "./types";
import { highlightHashtags } from "./highlight-hashtags";
import TweetMedia from "./tweet-media";
import { cn } from "@/lib/utils";

interface QuotedTweetProps {
  tweet: ITweet;
  className?: string;
}

const QuotedTweet = ({ tweet, className }: QuotedTweetProps) => {
  const router = useRouter();

  const goToPost = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/posts/${tweet?.id}`);
  }, [tweet?.id]);

  const goToProfile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${tweet.user.id}`);
  }, [tweet.user.id]);

  const createdAt = tweet?.createdAt
    ? formatDistanceToNowStrict(new Date(tweet.createdAt))
    : null;

  if (!tweet) return null;

  return (
    <div
      className={cn(
        "mt-2 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors",
        className
      )}
      onClick={goToPost}
    >
      <div className="p-3">
        <div className="flex flex-row gap-2 w-full">
          <Avatar
            onClick={goToProfile}
            className="h-8 w-8 cursor-pointer flex-shrink-0"
          >
            <AvatarImage
              src={
                tweet?.user?.profileImage || `/images/user_placeholder.png`
              }
            />
          </Avatar>

          <div className="w-full min-w-0">
            <div className="flex flex-row items-center gap-2">
              <div
                className="line-clamp-1 truncate"
                onClick={goToProfile}
              >
                <span className="font-semibold cursor-pointer text-sm hover:underline">
                  {tweet?.user?.name}
                </span>
              </div>
              <div className="line-clamp-1 truncate">
                <span className="text-sm text-light-gray">
                  @{tweet?.user?.username}
                </span>
              </div>
              {createdAt && (
                <div className="line-clamp-1 truncate flex-shrink-0">
                  <span className="text-xs sm:text-sm text-light-gray">
                    · {createdAt} ago
                  </span>
                </div>
              )}
            </div>

            {tweet?.body && (
              <div className="mt-1 text-sm line-clamp-4">
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
  );
};

export default QuotedTweet;
