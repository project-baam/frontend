import { create } from "zustand";

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

interface ProfileState {
  name: string;
  school: string;
  grade: string;
  class: string;
  profileImage: string;
  setName: (name: string) => void;
  setSchool: (school: string) => void;
  setGrade: (grade: string) => void;
  setClass: (classValue: string) => void;
  setProfileImage: (profileImage: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "한지우",
  school: "태초대학교",
  grade: "3학년",
  class: "2반",
  profileImage: "",
  setName: (name) => set({ name }),
  setSchool: (school) => set({ school }),
  setGrade: (grade) => set({ grade }),
  setClass: (classValue) => set({ class: classValue }),
  setProfileImage: (profileImage) => set({ profileImage })
}));
