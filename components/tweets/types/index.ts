
import { IUser } from "@/components/profile/types";
import { Bookmarks, Like, Media, Post, Retweet } from "@prisma/client";

export interface ITweet extends Post {
  user: IUser;
  likes: ILike[];
  media: IMedia[];
  comments: ITweet[];
  Bookmarks: IBookmark[];
  Retweets: IRetweet[];
  pinned_by_users : IUser[];
  retweet_from?: ITweet | null;
  quote_from?: ITweet | null;
  _count: {
    likes: number;
    comments: number;
    Bookmarks: number;
    Retweets: number;
  };
}

export interface ILike extends Like {
  user: IUser;
  tweet: ITweet;
}

export interface IRetweet extends Retweet {
  user: IUser;
  tweet: ITweet;
}

export interface IInfiniteTweets {
  pages: { tweets: ITweet[]; nextId?: string | undefined }[];
  pageParams: any;
}

export interface IMedia extends Media {
  tweet: ITweet;
}

export interface IBookmark extends Bookmarks {
  user: IUser;
  tweet: ITweet;
}
