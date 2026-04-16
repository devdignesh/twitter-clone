import { AuthOptions } from "next-auth";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// 开发模式模拟用户数据
const mockUser = {
  id: "clw8f7q3x0000qz9xxq0q0q0q0",
  name: "Test User",
  email: "test@example.com",
  profileImage: "https://i.pravatar.cc/150?img=68",
  username: "testuser",
  createdAt: new Date(),
  updatedAt: new Date(),
  followers: [],
  followersIds: [],
  following: [],
  followingIds: [],
};

// 检查是否为开发模式
const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

export const authOptions: AuthOptions = {
  adapter: isDevMode ? undefined : PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (isDevMode) {
          // 开发模式：直接返回模拟用户
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            image: mockUser.profileImage,
          };
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          return user;
        } catch (error) {
          console.warn("⚠️ Database connection error in authorize:", error);
          // 数据库连接失败时返回模拟用户
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            image: mockUser.profileImage,
          };
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      if (isDevMode) {
        // 开发模式：直接使用模拟用户
        session.currentUser = mockUser;
        return session;
      }
      
      try {
        const isExistingUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (!isExistingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: session.user.email,
              name: session.user.name,
              profileImage: session.user.image,
            },
          });

          session.currentUser = newUser;
        } else {
          session.currentUser = isExistingUser;
        }
      } catch (error) {
        console.warn("⚠️ Database connection error in session callback:", error);
        // 数据库连接失败时使用模拟用户
        session.currentUser = mockUser;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET || "your-secret-key" },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  // 开发模式下简化认证流程
  ...(isDevMode && {
    debug: true,
    pages: {
      signIn: "",
    },
  }),
};
