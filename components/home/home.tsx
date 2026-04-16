"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import NextTopLoader from "nextjs-toploader";
import Aside from "../aside/aside";
import LoadingScreen from "../elements/loading-screen/loading-screen";
import Auth from "../auth_user";
import MobileNavbar from "../navbar/mobile-navbar";
import CreateTweetDialog from "../sidebar/create-tweet-model";
import useCreateTweetStore from "../sidebar/store/useCreateTweetStore";
import QuoteTweetDialog from "../tweets/quote-tweet-dialog";

// 检查是否为开发模式
const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

interface Props {
  children: React.ReactNode;
}

const Home = ({ children }: Props) => {
  const { data: session, status, signIn } = useSession();
  const createTweetDialog = useCreateTweetStore();

  // 开发模式：自动登录
  useEffect(() => {
    if (isDevMode && status === "unauthenticated") {
      // 使用 credentials 提供者自动登录
      signIn("credentials", {
        email: "test@example.com",
        password: "password",
        redirect: false,
      });
    }
  }, [isDevMode, status, signIn]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  // 开发模式：即使没有会话也直接进入主界面
  if (!session && !isDevMode) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  // 模拟会话数据（开发模式）
  const mockSession = isDevMode && !session ? {
    currentUser: {
      id: "clw8f7q3x0000qz9xxq0q0q0q0",
      name: "Test User",
      email: "test@example.com",
      profileImage: "https://i.pravatar.cc/150?img=68",
      username: "testuser",
    }
  } : session;

  return (
    <>
      <div className="layout max-w-[1265px]">
        <MobileNavbar />

        <Sidebar />
        <main
          aria-label="Home timeline"
          id="home-timeline"
          className="border-x"
        >
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />

          {children}
        </main>

        <Aside />

        <CreateTweetDialog
          isOpen={createTweetDialog.isOpen}
          onClose={createTweetDialog.onClose}
        />
        <QuoteTweetDialog />
      </div>
    </>
  );
};

export default Home;
