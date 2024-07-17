import create from "zustand";

interface ChatState {
  messages: Message[];
  totalUser: number;
  title: string;
  addMessage: (message: Message) => void;
}

export interface Message {
  id: number;
  name: string;
  content: string;
  create_date: string;
  profileImgUrl?: string; // 선택적으로 프로필 이미지 URL
  isOpen: boolean; // 선택적으로 존재하는 프로퍼티
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  totalUser: 0,
  title: "",
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    }))
}));
