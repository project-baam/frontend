import React, { useState } from "react";
import styled from "@emotion/native";
import { View, Text, Image, TextInput, ScrollView, SafeAreaView } from "react-native";
import { IconSearch } from "../../assets/assets";
import Chip from "../../components/common/Chip";
import { FilterLine } from "../../assets/assets";
import { FavoriteStar } from "../../assets/assets";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
// Sample data
const friends = [
  { id: 1, name: "노하은1", grade: 1, favorite: true, avatar: "https://placehold.co/400x400" },
  { id: 2, name: "노하은2", grade: 2, favorite: false, avatar: "https://placehold.co/400x400" },
  { id: 3, name: "노하은3", grade: 3, favorite: false, avatar: "https://placehold.co/400x400" },
  { id: 4, name: "노하은4", grade: 1, favorite: true, avatar: "https://placehold.co/400x400" },
  { id: 5, name: "노하은5", grade: 2, favorite: false, avatar: "https://placehold.co/400x400" },
  { id: 6, name: "노하은6", grade: 3, favorite: true, avatar: "https://placehold.co/400x400" },
  { id: 7, name: "노하은7", grade: 1, favorite: false, avatar: "https://placehold.co/400x400" },
  { id: 8, name: "노하은8", grade: 2, favorite: false, avatar: "https://placehold.co/400x400" },
  { id: 9, name: "노하은9", grade: 3, favorite: true, avatar: "https://placehold.co/400x400" },
  { id: 10, name: "노하은10", grade: 3, favorite: false, avatar: "https://placehold.co/400x400" }
];
function FriendListScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState("friends");
  const favoriteFriends = friends.filter((friend) => friend.favorite);
  const allFriends = friends;

  const FriendsList = () => (
    <View style={{ flex: 1 }}>
      <SearchContainer>
        <Image source={IconSearch} style={{ width: 24, height: 24 }} />
        <SearchInput placeholder="검색어를 입력하세요" />
      </SearchContainer>
      <ScrollViewContainer>
        <SectionTitle>즐겨찾기</SectionTitle>
        {favoriteFriends.length > 0 ? (
          favoriteFriends.map((friend) => (
            <FriendItem key={friend.id}>
              <Avatar source={{ uri: "https://picsum.photos/400/400" }} />
              <FriendInfo>
                <FriendName>{friend.name}</FriendName>
                <FriendGrade>{friend.grade}학년</FriendGrade>
              </FriendInfo>
            </FriendItem>
          ))
        ) : (
          <EmptyText>즐겨찾기한 친구가 없습니다.</EmptyText>
        )}

        <SectionTitle>전체</SectionTitle>
        {allFriends.map((friend) => (
          <FriendItem key={friend.id}>
            <Avatar source={{ uri: "https://picsum.photos/400/400" }} />
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <FriendGrade>{friend.grade}학년</FriendGrade>
            </FriendInfo>
          </FriendItem>
        ))}
      </ScrollViewContainer>
    </View>
  );

  const SchoolFriends = () => (
    <View style={{ flex: 1 }}>
      <SearchContainer>
        <Image source={IconSearch} style={{ width: 24, height: 24 }} />
        <SearchInput placeholder="검색어를 입력하세요" />
      </SearchContainer>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 7, paddingVertical: 4, marginBottom: 26, height: "80%" }}
        showsHorizontalScrollIndicator={false}
      >
        <Chip
          borderRadius="round"
          children="필터"
          textColor="#7b7b7b"
          size="medium"
          LeftIcon={<Image source={FilterLine} style={{ width: 18, height: 18 }} />}
        />
        <Chip borderRadius="circle" children="1학년" textColor="#7b7b7b" size="medium" />
        <Chip borderRadius="circle" children="2학년" textColor="#7b7b7b" size="medium" />
        <Chip borderRadius="circle" children="3학년" textColor="#7b7b7b" size="medium" />
        <Chip
          borderRadius="circle"
          children="친한친구"
          textColor="#7b7b7b"
          size="medium"
          LeftIcon={<Image source={FavoriteStar} style={{ width: 18, height: 18 }} />}
        />
      </ScrollView>

      <ScrollViewContainer>
        <SectionTitle>전체</SectionTitle>
        {allFriends.map((friend) => (
          <FriendItem key={friend.id}>
            <Avatar source={{ uri: "https://picsum.photos/400/400" }} />
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <FriendGrade>{friend.grade}학년</FriendGrade>
            </FriendInfo>
          </FriendItem>
        ))}
      </ScrollViewContainer>
    </View>
  );

  return (
    <Container>
      <ContentContainer>
        {/* <TouchableOpacity
          style={{ backgroundColor: "red", width: 100, height: 100 }}
          onPress={() => navigation.navigate("FriendProfile")}
        /> */}
        <Tabs>
          <TabButton active={selectedTab === "friends"} onPress={() => setSelectedTab("friends")}>
            <TabText active={selectedTab === "friends"}>친구들</TabText>
          </TabButton>
          <TabButton active={selectedTab === "more"} onPress={() => setSelectedTab("more")}>
            <TabText active={selectedTab === "more"}>더보기</TabText>
          </TabButton>
        </Tabs>
        <View style={{ flex: 1 }}>{selectedTab === "friends" ? <FriendsList /> : <SchoolFriends />}</View>
      </ContentContainer>
    </Container>
  );
}

export default FriendListScreen;
const Container = styled.SafeAreaView`
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
  margin-bottom: 16px;
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

const FriendItem = styled(View)`
  padding-vertical: 8px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 25px;
  margin-right: 12px;
`;

const FriendInfo = styled(View)`
  margin-left: 12px;
  gap: 4px;
`;

const FriendName = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

const FriendGrade = styled(Text)`
  font-size: 14px;
  color: #666;
`;
const EmptyText = styled(Text)`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;
const ScrollViewContainer = styled(ScrollView)`
  flex-grow: 1;
`;

const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 500px;
  font-family: Pretendard;
  color: #7b7b7b;
  text-align: left;
  margin-vertical: 10.5px;
`;

const SearchContainer = styled(View)`
  align-self: stretch;
  border-radius: 12px;
  background-color: #f5f5f5;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  margin-bottom: 20px;
`;

const SearchInput = styled(TextInput)`
  align-self: stretch;
  color: #000;
  line-height: 22px;
  font-family: Pretendard;
  font-size: 16px;
  margin-left: 12px;
  text-align: left;
  align-items: center;
`;
