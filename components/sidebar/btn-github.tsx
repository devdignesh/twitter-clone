import React from "react";
import Link from "next/link";
import { GithubIcon } from "./assets/github-icon";
import { FaGithub } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";

const GithubButton = () => {
  return (
    <Link
      href={"https://github.com/devdignesh/twitter-clone"}
      className="mt-4 max-w-[234px] xxl:w-full"
      target="_blank"
    >
      <div className="w-full flex justify-center bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 hover:dark:bg-zinc-900 rounded-full p-3 ">
        <span className="flex items-center justify-center xxl:hidden h-6 w-6 fill-slate-100 ">
          <FaGithub size={20} />
        </span>
        <div className="hidden  xxl:inline ">
          <span className="text-base flex justify-center items-center gap-3 font-semibold dark:text-white text-black">
            <span className="flex justify-center items-center gap-2">
              <FaGithub size={20} />
              Github
            </span>
            <IoPaperPlane size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GithubButton;
