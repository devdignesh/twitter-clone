import { create } from "zustand";
import { ITweet } from "@/components/tweets/types";

interface IQuoteTweetStore {
  isOpen: boolean;
  tweet: ITweet | null;
  onOpen: (tweet: ITweet) => void;
  onClose: () => void;
}

const useQuoteTweetStore = create<IQuoteTweetStore>((set) => ({
  isOpen: false,
  tweet: null,
  onOpen: (tweet: ITweet) => set({ isOpen: true, tweet }),
  onClose: () => set({ isOpen: false, tweet: null }),
}));

export default useQuoteTweetStore;
