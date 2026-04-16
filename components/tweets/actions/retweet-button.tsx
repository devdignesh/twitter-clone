import { RetweetIcon } from "@/assets/retweet-icon";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { ITweet } from "../types";
import { useRetweet } from "../hooks/use-retweet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuItem from "@/components/elements/menu/menu-item";
import useQuoteTweetStore from "../store/use-quote-tweet-store";
import { cn } from "@/lib/utils";

const RetweetButton = ({ tweet }: { tweet: ITweet }) => {
  const { data: session }: any = useSession();
  const mutation = useRetweet();
  const quoteTweetStore = useQuoteTweetStore();
  const isRetweeting = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasRetweeted = tweet?.Retweets?.some(
    (retweet) => retweet.userId === session?.currentUser?.id
  );

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRetweeting.current || !session?.currentUser?.id) return;
    isRetweeting.current = true;
    mutation.mutate({
      tweetId: tweet.id,
      userId: session.currentUser.id,
    });
    setIsOpen(false);
    isRetweeting.current = false;
  };

  const handleQuoteTweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    quoteTweetStore.onOpen(tweet);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row items-center min-w-16 group">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className={cn(
            "rounded-full p-2 fill-gray-600 dark:fill-gray-500 cursor-pointer group-hover:fill-green-500 transition-colors duration-200 ease-in-out group-hover:bg-green-500/10 h-8 w-8",
            hasRetweeted && "fill-green-500 dark:fill-green-500"
          )}
        >
          <RetweetIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <MenuItem onClick={handleRetweet} className="fill-secondary">
              <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600">
                <RetweetIcon />
              </span>
              <span>{hasRetweeted ? "Undo Retweet" : "Retweet"}</span>
            </MenuItem>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuItem onClick={handleQuoteTweet} className="fill-secondary">
              <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13A2.5 2.5 0 0 1 21 4.5v9a2.5 2.5 0 0 1-2.5 2.5h-5.793l-3.853 3.854A.5.5 0 0 1 8.5 19.5V16H5.5A2.5 2.5 0 0 1 3 13.5v-9zM5.5 3A1.5 1.5 0 0 0 4 4.5v9A1.5 1.5 0 0 0 5.5 15h4a.5.5 0 0 1 .5.5v3.793L13.793 15H18.5A1.5 1.5 0 0 0 20 13.5v-9A1.5 1.5 0 0 0 18.5 3h-13z"></path>
                  </g>
                </svg>
              </span>
              <span>Quote Tweet</span>
            </MenuItem>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {tweet && tweet?._count?.Retweets > 0 && (
        <span
          className={cn(
            "text-sm text-neutral-500 group-hover:text-green-500 transition-colors duration-200 ease-in-out",
            hasRetweeted && "text-green-500"
          )}
        >
          {tweet?._count?.Retweets}
        </span>
      )}
    </div>
  );
};

export default RetweetButton;
