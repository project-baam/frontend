import { NotificationCategory } from "./notification.enums";
import { Notification } from "./notification.types";

export const MockNotifications: Notification[] = [
  {
    id: 1,
    category: NotificationCategory.SubjectMemo,
    title: "국어 II",
    body: {
      eventId: 300
    },
    sentAt: new Date("2024-10-04"),
    isRead: false,
    message: "준비물이 있습니다."
  },
  {
    id: 2,
    category: NotificationCategory.SubjectMemo,
    title: "국어 II",
    body: {
      eventId: 300
    },
    sentAt: new Date("2024-10-03"),
    isRead: false,
    message: "준비물이 있습니다."
  },
  {
    id: 3,
    category: NotificationCategory.FriendRequest,
    title: "하하 님이 친구가 되고 싶어해요!",
    body: {
      requestId: 300,
      requestType: "received"
    },
    sentAt: new Date("2024-10-03"),
    isRead: false
  },
  {
    id: 4,
    category: NotificationCategory.FriendRequest,
    title: "abc 님께 친구 요청을 보냈어요!",
    body: {
      requestId: 300,
      requestType: "sent"
    },
    sentAt: new Date("2024-10-02"),
    isRead: true
  },
  {
    id: 5,
    category: NotificationCategory.FriendRequest,
    title: "abc 님께 친구 요청을 보냈어요!",
    body: {
      requestId: 300,
      requestType: "sent"
    },
    sentAt: new Date("2024-10-01"),
    isRead: true
  },
  {
    id: 6,
    category: NotificationCategory.FriendRequest,
    title: "abc 님께 친구 요청을 보냈어요!",
    body: {
      requestId: 300,
      requestType: "sent"
    },
    sentAt: new Date("2024-10-01"),
    isRead: false
  },
  {
    id: 7,
    category: NotificationCategory.FriendRequest,
    title: "abc 님께 친구 요청을 보냈어요!",
    body: {
      requestId: 300,
      requestType: "sent"
    },
    sentAt: new Date("2024-09-20"),
    isRead: true
  },
  {
    id: 8,
    category: NotificationCategory.Calendar,
    title: "캘린더: 강아지 산책",
    body: {
      eventId: 933
    },
    sentAt: new Date("2024-09-21"),
    isRead: false,
    message: "일정이 있습니다"
  },
  {
    id: 9,
    category: NotificationCategory.FriendRequest,
    title: "abc 님께 친구 요청을 보냈어요!",
    body: {
      requestId: 300,
      requestType: "sent"
    },
    sentAt: new Date("2024-09-10"),
    isRead: false
  }
];
