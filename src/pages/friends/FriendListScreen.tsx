import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { View, Text, Image, TextInput, ScrollView, SafeAreaView } from "react-native";
import { IconSearch } from "../../assets/assets";
import Chip from "../../components/common/Chip";
import { FilterLine } from "../../assets/assets";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import axios from "axios";
import useUserStore from "../../store/UserStore";
const filterList = [
  {
    id: 0,
    grade: "전체",
    isSelected: false
  },
  {
    id: 1,
    grade: "1학년",
    isSelected: false
  },
  {
    id: 2,
    grade: "2학년",
    isSelected: false
  },
  {
    id: 3,
    grade: "3학년",
    isSelected: false
  },
  {
    id: 4,
    grade: "즐겨찾기",
    isSelected: false
  }
];
const friends = [
  {
    userId: 5,
    fullName: "혜림",
    profileImage: "https://sgp1.digitaloceanspaces.com/baam/development/user-profiles/5",
    grade: "2",
    className: "2",
    isFavorite: true,
    initial: "",
    activeClassNow: "ㅎ_ㅎ"
  }
];
function FriendListScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState("friends");
  const [favoriteFriends, setFavoriteFriends] = useState(friends);
  //friends.filter((friend) => friend.favorite);
  const [allFriends, setAllFriends] = useState(friends);
  const [schoolFriends, setSchoolFriends] = useState(friends);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [filteredFriends, setFilteredFriends] = useState(allFriends);
  const { accessToken } = useUserStore((state) => state);
  useEffect(() => {
    // console.log(selectedFilter);
    filterList.filter((fl) => {
      if (fl.grade === selectedFilter) fl.isSelected = !fl.isSelected;
      else fl.isSelected = false;
    });
    setFilteredFriends(
      schoolFriends.filter((friend) => {
        if (selectedFilter === "전체") return true;
        if (selectedFilter === "1학년") return friend.grade === "1";
        if (selectedFilter === "2학년") return friend.grade === "2";
        if (selectedFilter === "3학년") return friend.grade === "3";
        if (selectedFilter === "친한친구") return friend.isFavorite;
      })
    );
  }, [selectedFilter]);
  const getFriends = async () => {
    try {
      const response = await axios.get("https://b-site.site/friends?count=10&page=0", {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것을 명시
          Authorization: `Bearer ${accessToken}` // 필요시, Authorization 헤더에 토큰 포함
        }
      });
      setFavoriteFriends(response.data.favaorites);
      setAllFriends(response.data.all);
    } catch (error: any) {
      console.error(error.response ? error.response.data : error.message); // 오류 처리
    }
  };
  const getSchoolFriends = async () => {
    try {
      const response = await axios.get("https://b-site.site/schoolmates?count=10&page=0", {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것을 명시
          Authorization: `Bearer ${accessToken}` // 필요시, Authorization 헤더에 토큰 포함
        }
      });
      setSchoolFriends(response.data.list);
    } catch (error: any) {
      console.error(error.response ? error.response.data : error.message); // 오류 처리
    }
  };
  useEffect(() => {
    getFriends();
    getSchoolFriends();
  }, []);
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
            <FriendItem
              key={friend.userId}
              onPress={() =>
                navigation.navigate("FriendProfile", {
                  userId: friend.userId,
                  fullName: friend.fullName,
                  profileImage: friend.profileImage,
                  grade: friend.grade,
                  isFavorite: friend.isFavorite,
                  isFriend: true
                })
              }
            >
              <Avatar source={{ uri: friend.profileImage }} />
              <FriendInfo>
                <FriendName>{friend.fullName}</FriendName>
                <FriendGrade>{friend.grade}학년</FriendGrade>
              </FriendInfo>
            </FriendItem>
          ))
        ) : (
          <EmptyText>즐겨찾기한 친구가 없습니다.</EmptyText>
        )}

        <SectionTitle>전체</SectionTitle>
        {allFriends.map((friend) => (
          <FriendItem
            key={friend.userId}
            onPress={() =>
              navigation.navigate("FriendProfile", {
                userId: friend.userId,
                fullName: friend.fullName,
                profileImage: friend.profileImage,
                grade: friend.grade,
                isFavorite: friend.isFavorite,
                isFriend: true
              })
            }
          >
            <Avatar source={{ uri: friend.profileImage }} />
            <FriendInfo>
              <FriendName>{friend.fullName}</FriendName>
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
        <TouchableOpacity>
          <Chip
            borderRadius="circle"
            children="필터"
            textColor="#7b7b7b"
            size="medium"
            LeftIcon={<Image source={FilterLine} style={{ width: 18, height: 18 }} />}
          />
        </TouchableOpacity>
        {filterList.map((filter) => (
          <TouchableOpacity key={filter.id} onPress={() => setSelectedFilter(filter.grade)}>
            {filter.isSelected ? (
              <Chip
                borderRadius="circle"
                children={filter.grade}
                backGroundColor="#8A7EFF33"
                textColor="#8A7EFF"
                size="medium"
              />
            ) : (
              <Chip borderRadius="circle" children={filter.grade} textColor="#7b7b7b" size="medium" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", minHeight: "100%" }} // 추가: minHeight 설정
      >
        <SectionTitle>전체</SectionTitle>
        {filteredFriends.map((friend) => (
          <FriendItem
            key={friend.userId}
            onPress={() =>
              navigation.navigate("FriendProfile", {
                userId: friend.userId,
                fullName: friend.fullName,
                profileImage: friend.profileImage,
                grade: friend.grade,
                isFavorite: friend.isFavorite,
                // 친구여부 설정
                isFriend: false
              })
            }
          >
            <Avatar source={{ uri: friend.profileImage }} />
            <FriendInfo>
              <FriendName>{friend.fullName}</FriendName>
              <FriendGrade>{friend.grade}학년</FriendGrade>
            </FriendInfo>
          </FriendItem>
        ))}
      </ScrollView>
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

const FriendItem = styled(TouchableOpacity)`
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
  flex: 1;
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
