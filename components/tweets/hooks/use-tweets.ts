"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ITweet } from "../types";
import { getTweets } from "../api/get-tweets";

// 检查是否为开发模式
const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

// 开发模式模拟推文数据
const mockTweets: ITweet[] = [
  {
    id: "clw8f7q3x0001qz9xxq0q0q0q1",
    body: "Hello world! This is a test tweet. #test #hello",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "clw8f7q3x0000qz9xxq0q0q0q0",
    likedIds: [],
    in_reply_to_screen_name: null,
    in_reply_to_tweet_id: null,
    image: null,
    favorite_count: 0,
    retweet_count: 0,
    retweet_from_tweet_id: null,
    quote_from_tweet_id: null,
    user: {
      id: "clw8f7q3x0000qz9xxq0q0q0q0",
      name: "Test User",
      email: "test@example.com",
      profileImage: "https://i.pravatar.cc/150?img=68",
      username: "testuser",
    },
    likes: [],
    media: [],
    comments: [],
    Bookmarks: [],
    Retweets: [],
    pinned_by_users: [],
    retweet_from: null,
    quote_from: null,
    _count: {
      likes: 0,
      comments: 0,
      Bookmarks: 0,
      Retweets: 0,
    },
  },
  {
    id: "clw8f7q3x0002qz9xxq0q0q0q2",
    body: "Another test tweet with an image!",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    userId: "clw8f7q3x0000qz9xxq0q0q0q0",
    likedIds: [],
    in_reply_to_screen_name: null,
    in_reply_to_tweet_id: null,
    image: null,
    favorite_count: 0,
    retweet_count: 0,
    retweet_from_tweet_id: null,
    quote_from_tweet_id: null,
    user: {
      id: "clw8f7q3x0000qz9xxq0q0q0q0",
      name: "Test User",
      email: "test@example.com",
      profileImage: "https://i.pravatar.cc/150?img=68",
      username: "testuser",
    },
    likes: [],
    media: [
      {
        id: "clw8f7q3x0003qz9xxq0q0q0q3",
        tweet_id: "clw8f7q3x0002qz9xxq0q0q0q2",
        message_id: null,
        media_url: "https://picsum.photos/800/450",
        media_type: "image",
        media_path: "test-image.jpg",
        tweet: null,
      },
    ],
    comments: [],
    Bookmarks: [],
    Retweets: [],
    pinned_by_users: [],
    retweet_from: null,
    quote_from: null,
    _count: {
      likes: 0,
      comments: 0,
      Bookmarks: 0,
      Retweets: 0,
    },
  },
  {
    id: "clw8f7q3x0004qz9xxq0q0q0q4",
    body: "Check out this amazing project! #opensource #coding",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    userId: "clw8f7q3x0000qz9xxq0q0q0q0",
    likedIds: [],
    in_reply_to_screen_name: null,
    in_reply_to_tweet_id: null,
    image: null,
    favorite_count: 0,
    retweet_count: 0,
    retweet_from_tweet_id: null,
    quote_from_tweet_id: null,
    user: {
      id: "clw8f7q3x0000qz9xxq0q0q0q0",
      name: "Test User",
      email: "test@example.com",
      profileImage: "https://i.pravatar.cc/150?img=68",
      username: "testuser",
    },
    likes: [],
    media: [],
    comments: [],
    Bookmarks: [],
    Retweets: [],
    pinned_by_users: [],
    retweet_from: null,
    quote_from: null,
    _count: {
      likes: 0,
      comments: 0,
      Bookmarks: 0,
      Retweets: 0,
    },
  },
];

interface IInfiniteTweets {
  nextId: string;
  tweets: ITweet[];
}

export const useTweets = ({
  queryKey = ["tweets"],
  type,
  id,
}: {
  queryKey?: string[];
  type?: string;
  id?: string;
}) => {
  return useInfiniteQuery<IInfiniteTweets>({
    queryKey,
    queryFn: ({ pageParam }) => {
      if (isDevMode) {
        // 开发模式：返回模拟数据
        return {
          nextId: "",
          tweets: mockTweets,
        };
      }
      // 生产模式：调用真实API
      return getTweets({
        pageParam,
        limit: 20,
        type,
        id,
      });
    },
    initialPageParam: "",

    getNextPageParam: (lastPage) => {
      return lastPage?.nextId;
    },

    refetchOnWindowFocus: false,
  });
};
