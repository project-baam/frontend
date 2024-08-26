import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import styled from "@emotion/native";
import axios from "axios";
import { AddMemoIcon } from "../../assets/assets";

type Memo = {
  id: number;
  subjectName: string;
  title: string;
  content: object; // `content`는 객체이므로 `object` 타입으로 정의
  datetime: string;
};
type MemoList = {
  total: number;
  list: Memo[]; // `list`는 `Memo` 타입의 배열
};

type SubjectMemos = {
  subjectName: string;
  memos: Memo[];
};

// 전체 응답 타입 정의
type MemoListResponse = {
  total: number;
  list: SubjectMemos[];
};
const todayList = [
  {
    id: 0,
    subjectName: "국어1",
    title: "국어메모1",
    content: "국어 메모 11111",
    datetime: "Sat Aug 24 2024 22:09:18 GMT+0900 (한국 표준시)"
  },
  {
    id: 1,
    subjectName: "국어2",
    title: "국어메모2",
    content: "국어 메모 11111",
    datetime: new Date()
  },
  {
    id: 2,
    subjectName: "국어2",
    title: "국어메모2",
    content: "국어 메모 11111",
    datetime: new Date()
  },
  {
    id: 3,
    subjectName: "국어3",
    title: "국어메모3",
    content: "",
    datetime: new Date()
  }
];

const memoList = {
  total: 0,
  list: [
    {
      subjectName: "국어1",
      memos: [
        {
          id: 0,
          subjectName: "국어1",
          title: "국어메모1",
          content: "국어 메모 11111",
          datetime: "Sat Aug 24 2024 22:09:18 GMT+0900 (한국 표준시)"
        },
        {
          id: 1,
          subjectName: "국어2",
          title: "국어메모2",
          content: "",
          datetime: new Date()
        },
        {
          id: 2,
          subjectName: "국어3",
          title: "국어메모3",
          content: "",
          datetime: new Date()
        }
      ]
    },
    {
      subjectName: "수학1",
      memos: [
        {
          id: 0,
          subjectName: "수학1",
          title: "수학메모1",
          content: "",
          datetime: new Date()
        }
      ]
    },
    {
      subjectName: "수학1",
      memos: [
        {
          id: 0,
          subjectName: "수학1",
          title: "수학메모1",
          content: "",
          datetime: new Date()
        }
      ]
    },
    {
      subjectName: "수학1",
      memos: [
        {
          id: 0,
          subjectName: "수학1",
          title: "수학메모1",
          content: "",
          datetime: new Date()
        }
      ]
    },
    {
      subjectName: "수학1",
      memos: [
        {
          id: 0,
          subjectName: "수학1",
          title: "수학메모1",
          content: "",
          datetime: new Date()
        }
      ]
    }
  ]
};

function MemoScreen2({ navigation, route }: any) {
  const [memos, setMemos] = useState<any>(todayList);
  const [subjectMemos, setSubjectMemos] = useState<any>(memoList);
  const [selectedTab, setSelectedTab] = useState("subjects");

  const MySubjects = () => {
    return (
      <ScrollView style={{ marginTop: 15 }}>
        <HeaderContainer>
          <HeaderText>
            오늘(
            {new Date().toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric"
            })}
            ) 일정
          </HeaderText>
          <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
            {memos.map(
              (memo: {
                id: React.Key | null | undefined;
                subjectName:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                datetime: any;
                content: any;
              }) => (
                <MemoCard
                  backgroundColor="#CFBAF0"
                  key={memo.id}
                  onPress={() =>
                    navigation.navigate("EditMemoScreen", {
                      id: memo.id,
                      subjectName: memo.subjectName,
                      title: memo.title,
                      datetime: memo.datetime,
                      content: memo.content
                    })
                  }
                >
                  <MemoSubject textColor="#FFFFFF">{memo.subjectName}</MemoSubject>
                  <MemoTitle textColor="#FFFFFF">{memo.title}</MemoTitle>
                </MemoCard>
              )
            )}
          </HorizontalScrollView>
        </HeaderContainer>

        {/* 과목별 메모 */}
        {subjectMemos.list.map(
          (
            subjectMemo: {
              subjectName:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              memos: any[];
            },
            index: React.Key | null | undefined
          ) => (
            <MemoSection key={index}>
              <SectionTitle>{subjectMemo.subjectName}</SectionTitle>
              <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
                {subjectMemo.memos.map((memo) => (
                  <MemoCard
                    backgroundColor="#FFFFFF"
                    key={memo.id}
                    onPress={() =>
                      navigation.navigate("EditMemoScreen", {
                        id: memo.id,
                        subjectName: memo.subjectName,
                        title: memo.title,
                        datetime: memo.datetime,
                        content: memo.content
                      })
                    }
                  >
                    <MemoSubject textColor="#7B7B7B">{memo.subjectName}</MemoSubject>
                    <MemoTitle textColor="#8A7EFF">{memo.title}</MemoTitle>
                  </MemoCard>
                ))}
              </HorizontalScrollView>
            </MemoSection>
          )
        )}
      </ScrollView>
    );
  };

  const ChatRooms = () => {
    return (
      <View>
        <Text>수업톡방</Text>
      </View>
    );
  };

  return (
    <Container>
      <ContentContainer>
        <Tabs>
          <TabButton active={selectedTab === "subjects"} onPress={() => setSelectedTab("subjects")}>
            <TabText active={selectedTab === "subjects"}>나의 수업합</TabText>
          </TabButton>
          <TabButton active={selectedTab === "chats"} onPress={() => setSelectedTab("chats")}>
            <TabText active={selectedTab === "chats"}>수업 톡방</TabText>
          </TabButton>
        </Tabs>
        <View>{selectedTab === "subjects" ? <MySubjects /> : <ChatRooms />}</View>
        {/* 추가버튼  */}
        <AddMemo onPress={() => navigation.navigate("EditMemoScreen")}>
          <Image source={AddMemoIcon} style={{ width: 22, height: 22 }} />
        </AddMemo>
      </ContentContainer>
    </Container>
  );
}

export default MemoScreen2;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-horizontal: 16px;
`;

const Tabs = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 12px;
  padding-vertical: 4px;
  align-items: center;
  margin-bottom: 10px;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  align-self: stretch;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.active ? "#8a7eff" : "#fff")};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: 8px;
  padding-vertical: 4px;
`;

const TabText = styled.Text<{ active: boolean }>`
  color: ${(props) => (props.active ? "#000" : "#888")};
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  font-family: "Esamanru OTF";
`;

const HeaderContainer = styled.View`
  padding-bottom: 14px;
  margin-bottom: 16px;
`;

const HeaderText = styled.Text`
  padding-bottom: 19px;
  margin-top: 22px;
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
  font-family: "Pretendard";
  color: #434343;
  text-align: left;
`;

const HorizontalScrollView = styled(ScrollView)`
  padding-horizontal: 13.5px;
`;
//background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "#cfbaf0")};

const MemoCard = styled.TouchableOpacity<{ backgroundColor: string }>`
  border-radius: 12px;
  flex: 1;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "#cfbaf0")};
  width: 100%;
  padding-horizontal: 16px;
  padding-top: 12px;
  padding-bottom: 16px;
  gap: 8px;
  margin-right: 12px;
  min-width: 120px;
`;

const MemoSubject = styled.Text<{ textColor: string }>`
  align-self: stretch;
  font-size: 12px;
  font-weight: 500;
  font-family: "Inter-Medium";
  color: ${(props) => (props.textColor ? props.textColor : "#7B7B7B")};

  text-align: left;
`;

const MemoTitle = styled.Text<{ textColor: string }>`
  align-self: stretch;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard";
  color: ${(props) => (props.textColor ? props.textColor : "#7B7B7B")};
  text-align: left;
`;

const MemoSection = styled.View`
  padding-bottom: 16px;
  border-radius: 6px;
  background-color: rgba(207, 186, 240, 0.1);
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  line-height: 22px;
  font-size: 16px;
  margin-bottom: 12px;
  margin-top: 12px;
  margin-left: 20px;
  font-weight: 500;
  font-family: "Pretendard";
  color: #262626;
  text-align: left;
`;

const AddMemo = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #8a7eff;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`;
