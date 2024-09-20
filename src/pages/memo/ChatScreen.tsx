import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/native";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import useAuthStore from "../../store/UserAuthStore";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { VectorLeft } from "../../assets/assets";

const MessageItem = ({ message, isOwnMessage }: any) => {
  if (!message) return null;
  if (!message.sender) return null;
  return (
    <View style={[styles.messageContainer, { justifyContent: isOwnMessage ? "flex-end" : "flex-start" }]}>
      {!isOwnMessage && (
        <Image
          source={
            message.sender ? { uri: message.sender.profileImageUrl } : require("../../assets/images/dummyprofile.png")
          }
          style={styles.avatar}
        />
      )}
      {isOwnMessage ? (
        <>
          <Text style={styles.timestamp}>{new Date(message.sentAt).toLocaleTimeString()}</Text>

          <View
            style={[
              styles.messageBubble,
              {
                backgroundColor: "#8A7EFF"
              }
            ]}
          >
            {message.type === MessageType.TEXT ? (
              <Text style={[styles.messageContent, styles.white]}>{message.content}</Text>
            ) : (
              //   <FileMessage file={message.file} />
              <></>
            )}
          </View>
        </>
      ) : (
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.senderName}>{message.sender.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.messageBubble,
                {
                  backgroundColor: "#E9E9E9" // Custom color
                }
              ]}
            >
              {message.type === MessageType.TEXT ? (
                <Text style={[styles.messageContent, styles.black]}>{message.content}</Text>
              ) : (
                //   <FileMessage file={message.file} />
                <></>
              )}
            </View>
            <Text style={styles.timestamp}>{new Date(message.sentAt).toLocaleTimeString()}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export const ChatEvents = {
  FromClient: {
    SendTextMessage: "sendTextMessage",
    SendFileMessage: "sendFileMessage",
    JoinRoom: "joinRoom",
    LeaveRoom: "leaveRoom"
  },
  FromServer: {
    NewMessage: "newMessage",
    NewMessages: "newMessages",
    Exception: "exception"
  }
};
export enum UserStatus {
  ACTIVE = "active",
  INCOMPLETE_PROFILE = "incomplete_profile"
}

export enum SignInProvider {
  KAKAO = "kakao",
  APPLE = "apple"
}

export enum UserGrade {
  First = 1,
  Second = 2,
  Third = 3
}

export interface User {
  id: number;
  status: UserStatus;
  provider: SignInProvider;
  schoolId: number;
  schoolName: number;
  grade: UserGrade;
  className: string;
  fullName: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  isClassPublic: boolean;
  isTimetablePublic: boolean;
  notificationsEnabled: boolean;
}
export enum MessageType {
  TEXT = "text",
  FILE = "file"
}

interface ChatRoom {
  id: string;
  name: string;
  participantsCount: number;
  unreadMessageCount: number;
  lastMessage: string;
  timeAgo: string;
}

interface Message {
  type: MessageType;
  sender: {
    id: number;
    name: string;
    profileImageUrl?: string | null;
  };
  content?: string | null;
  file?: {
    url: string;
    name: string;
    size: number;
  } | null;
  sentAt: Date;
}

const API_URL = "https://b-site.site";
const SOCKET_URL = "https://b-site.site";

function ChatScreen({ navigation, route }: any) {
  const { token } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const connectSocket = useCallback(() => {
    console.log("Attempting to connect socket with token:", token);

    const newSocket = io(`${SOCKET_URL}/chat`, {
      auth: { token: token },
      transports: ["websocket"]
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      setIsConnected(true);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setIsConnected(false);
    });

    newSocket.on(ChatEvents.FromServer.NewMessage, (message: Message) => {
      console.log("New message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on(ChatEvents.FromServer.NewMessages, (newMessages: Message[]) => {
      console.log("New messages 여러명:", newMessages);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    });

    newSocket.on(ChatEvents.FromServer.Exception, (error: any) => {
      console.log("Exception:", error);
    });

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connectSocket]);

  const leaveRoom = useCallback(() => {
    if (socket && currentRoom) {
      console.log(`Leaving room: ${currentRoom}`);
      socket.emit(ChatEvents.FromClient.LeaveRoom, { roomId: currentRoom });
      setCurrentRoom(null);
      setMessages([]);
      navigation.goBack();
    }
  }, [socket, currentRoom]);

  const joinRoom = useCallback(
    (roomId: string) => {
      if (socket && roomId) {
        if (currentRoom) {
          leaveRoom();
        }
        console.log(`Joining room: ${roomId}`);
        socket.emit(ChatEvents.FromClient.JoinRoom, { roomId });
        setCurrentRoom(roomId);
        setMessages([]);
      }
    },

    [socket, currentRoom, leaveRoom]
  );

  const sendTextMessage = () => {
    if (socket && inputMessage && currentRoom) {
      console.log("Attempting to send message:", {
        roomId: currentRoom,
        content: inputMessage
      });

      socket.emit(
        ChatEvents.FromClient.SendTextMessage,
        {
          roomId: currentRoom,
          content: inputMessage
        },
        (response: any) => {
          console.log("Server acknowledged message:", response);
        }
      );

      setInputMessage("");
    }
  };

  const sendFileMessage = useCallback(() => {
    if (socket && file && currentRoom) {
      console.log("Attempting to send file message:", {
        roomId: currentRoom,
        fileName: file.name,
        fileSize: file.size
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const arrayBuffer = e.target.result as ArrayBuffer;

          socket.emit(
            ChatEvents.FromClient.SendFileMessage,
            {
              roomId: currentRoom,
              fileName: file.name,
              fileType: file.type,
              fileSize: file.size,
              fileData: arrayBuffer
            },
            (acknowledgement: any) => {
              console.log("Server acknowledged file message:", acknowledgement);
            }
          );

          setFile(null);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [socket, file, currentRoom]);

  const exitChatApplication = () => {
    if (socket) {
      socket.disconnect();
    }
    setChatRooms([]);
    setCurrentRoom(null);
    setMessages([]);
    setIsConnected(false);
    setCurrentUser(null);
    console.log("Exited chat application");
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(response.data);
        console.log("chat,", response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    // joinRoom(route.params.roomId);
    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView style={{ marginHorizontal: 16, flex: 1 }}>
      {loading && ( // 로딩 상태면 인디케이터 표시
        <LoadingContainer>
          <View
            style={{ backgroundColor: "#fff", justifyContent: "center", alignItems: "center", flex: 1, width: "100%" }}
          >
            <Text style={{ color: "#000" }}>채팅에 참여하시겠습니까?</Text>
            <Button
              title="예"
              onPress={() => {
                joinRoom(route.params.roomId);
                setLoading(false);
              }}
            />
          </View>
        </LoadingContainer>
      )}
      <Header style={{ zIndex: 2 }}>
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon source={VectorLeft} />
        </BackButton>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 26,
            fontWeight: "600",
            fontFamily: "Pretendard",
            color: "#262626",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 272,
            height: 28
          }}
        >
          {route.params.roomName}
          {route.params.roomCount}
        </Text>
        <View style={{ width: 24, height: 24 }} />
      </Header>
      {/* <Text>Current Room: {route.params.roomId}</Text> */}
      {/* <Button title="join room" onPress={() => joinRoom(route.params.roomId)}></Button> */}
      <Button title="해당 채팅방 나가기" color="red" onPress={leaveRoom} />
      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MessageItem message={item} isOwnMessage={item.sender && currentUser?.id === item.sender.id} />
          )}
        />
      </View>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#fff",
          borderColor: "#e9e9e9",
          borderWidth: 1,
          flexDirection: "row",
          paddingHorizontal: 12,
          paddingVertical: 8,
          gap: 8
        }}
      >
        <TextInput
          style={{
            borderRadius: 20,
            backgroundColor: "purple",
            borderColor: "#e9e9e9",
            borderWidth: 1,
            flexDirection: "row",
            paddingHorizontal: 12,
            paddingVertical: 8,
            gap: 8
          }}
          placeholder="메시지 보내기"
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <Button
          title="파일 선택"
          //   onPress={pickFile}
        />
        {file && <Text>선택된 파일: {file.name}</Text>}
        <View>
          <Button title="Text 타입 메시지 전송" onPress={sendTextMessage} color="blue" />
          <Button title="File 타입 메시지 전송" onPress={sendFileMessage} color="blue" />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ChatScreen;
const styles = StyleSheet.create({
  white: {
    color: "#fff"
  },
  black: {
    color: "#434343"
  },
  groupFlexBox: {
    alignItems: "center",
    flexDirection: "row"
  },
  textTypo: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Pretendard"
  },
  textClr: {
    color: "#7b7b7b",
    textAlign: "left"
  },
  icon: {
    width: 24,
    height: 24,
    overflow: "hidden"
  },
  text1: {
    fontSize: 18,
    lineHeight: 26,
    color: "#262626",
    textAlign: "left",
    fontFamily: "Pretendard",
    fontWeight: "600"
  },
  text2: {
    lineHeight: 22,
    color: "#c4c4c4",
    fontWeight: "600",
    fontSize: 16
  },
  parent: {
    gap: 4
  },
  text3: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 21,
    fontFamily: "Inter-Medium",
    width: 172,
    fontWeight: "500"
  },
  text4: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Pretendard",
    color: "#7b7b7b"
  },
  group: {
    gap: 8
  },
  text: {
    justifyContent: "center",
    gap: 4
  },
  text5: {
    color: "#8a7eff",
    fontWeight: "500"
  },
  alarmText: {
    shadowColor: "rgba(107, 110, 116, 0.04)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
    borderRadius: 100,
    backgroundColor: "#fff",
    padding: 10
  },
  content2: {
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: "rgba(207, 186, 240, 0.12)",
    borderStyle: "solid",
    borderColor: "#cfbaf0",
    borderLeftWidth: 6,
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 0
  },
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
    height: "70%"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8
  },
  messageBubble: {
    borderRadius: 16,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  senderName: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Pretendard",
    color: "#555",
    textAlign: "left",
    marginBottom: 8
  },
  messageContent: {
    fontSize: 16
  },
  timestamp: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Pretendard",
    color: "#9d9d9d",
    textAlign: "left",
    marginHorizontal: 8
  }
});
const LoadingContainer = styled(View)`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  align-items: "center";
  justify-content: "center";
  background-color: "rgba(0, 0, 0, 0.5)";
  z-index: 1000;
`;
const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;
const BackButton = styled(TouchableOpacity)`
  padding: 10px;
`;

const BackIcon = styled(Image)`
  width: 8.5px;
  height: 15px;
`;
