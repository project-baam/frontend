import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/native";
import { View, Text, Image, TextInput, ScrollView, SafeAreaView, FlatList, Pressable } from "react-native";
import { IconSearch } from "../../assets/assets";
import Chip from "../../components/common/Chip";
import { FilterLine } from "../../assets/assets";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import axios from "axios";
import SchoolmateList from "./SchoolmateList";
import useAuthStore from "../../store/UserAuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { FriendsStackParamList } from "../../navigations/FriendsStackNavigation";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<FriendsStackParamList, "FriendProfile">;

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
interface schoolmate {
  userId: number;
  fullName: string;
  profileImage: string;
  grade: number;
  className: string;
  initial: string;
  activeClassNow: string;
  isFavorite: boolean;
}
interface schoolmateList {
  list: schoolmate[];
  total: number;
  initialCounts: {};
}
interface allFriendList {
  favorites: schoolmate[];
  all: schoolmate[];
  total: number;
  initialCounts: {};
}
function FriendListScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [selectedTab, setSelectedTab] = useState("friends");
  // const [favoriteFriends, setFavoriteFriends] = useState();
  const [allFriends, setAllFriends] = useState<allFriendList>({
    favorites: [],
    all: [],
    total: 0,
    initialCounts: {}
  });
  const [page, setPage] = useState(0); // 페이지 번호 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [enteredText, setEnteredText] = useState("");
  const [schoolFriends, setSchoolFriends] = useState<schoolmateList>({
    list: [],
    total: 0,
    initialCounts: {}
  });
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const { token } = useAuthStore();
  useEffect(() => {
    filterList.filter((fl) => {
      if (fl.grade === selectedFilter) fl.isSelected = !fl.isSelected;
      else fl.isSelected = false;
    });
    // 필터 변경 시 데이터 초기화 및 새로 요청
    setPage(0);
    setSchoolFriends({ list: [], total: 0, initialCounts: {} });

    let grades: number | undefined;
    let isFavorite: boolean | undefined;

    switch (selectedFilter) {
      case "1학년":
        grades = 1;
        break;
      case "2학년":
        grades = 2;
        break;
      case "3학년":
        grades = 3;
        break;
      case "즐겨찾기":
        isFavorite = true;
        break;
      default:
        grades = undefined;
        isFavorite = undefined;
        break;
    }

    fetchSchoolMates(0, grades, undefined, isFavorite); // 첫 페이지 데이터 요청
  }, [selectedFilter]);

  async function fetchMyFriends(page: number, name?: string) {
    setLoading(true); // 로딩 시작
    const params: any = {
      count: 1000,
      page: page
    };

    if (name !== undefined) params.name = name;

    try {
      const response = await axios.get("https://b-site.site/friends", {
        params: params,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      setAllFriends((prev) => ({
        favorites: response.data.favorites,
        all: response.data.all,
        total: response.data.total,
        initialCounts: {}
      }));
    } catch (error) {
      console.error("Error fetching schoolmates:", error);
    } finally {
      setLoading(false); // 로딩 끝
    }
  }
  async function fetchSchoolMates(page: number, grades?: number, name?: string, isFavorite?: boolean) {
    setLoading(true); // 로딩 시작
    const params: any = {
      count: 10,
      page: page
    };

    if (grades !== undefined) params.grades = grades;
    if (name !== undefined) params.name = name;
    if (isFavorite !== undefined) params.isFavorite = isFavorite;

    try {
      const response = await axios.get("https://b-site.site/schoolmates", {
        params: params,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      setSchoolFriends((prev) => ({
        list: page === 0 ? response.data.list : [...prev.list, ...response.data.list], // 첫 페이지면 새로운 리스트, 아니면 기존 리스트에 추가
        total: response.data.total,
        initialCounts: {}
      }));
    } catch (error) {
      console.error("Error fetching schoolmates:", error);
    } finally {
      setLoading(false); // 로딩 끝
    }
  }

  const fetchMoreData = useCallback(() => {
    if (!loading && schoolFriends.list.length < (schoolFriends.total || 0)) {
      const nextPage = page + 1;
      setPage(nextPage);
      let grades: number | undefined;
      let isFavorite: boolean | undefined;

      switch (selectedFilter) {
        case "1학년":
          grades = 1;
          isFavorite = false;
          break;
        case "2학년":
          grades = 2;
          isFavorite = false;
          break;
        case "3학년":
          grades = 3;
          isFavorite = false;
          break;
        case "즐겨찾기":
          grades = undefined;
          isFavorite = true;
          break;
        default:
          grades = undefined;
          isFavorite = undefined;
          break;
      }

      fetchSchoolMates(nextPage, grades, undefined, isFavorite); // 다음 페이지 데이터 요청
    }
  }, [loading, schoolFriends, page, selectedFilter]);

  useEffect(() => {
    fetchSchoolMates(0); // 첫 페이지 데이터를 로드
    fetchMyFriends(0);
  }, []);
  useEffect(() => {
    console.log("all", allFriends);
  }, [allFriends]);
  async function handleSearchSchoolmate(text: string) {
    setEnteredText(text);
    fetchSchoolMates(0, undefined, text, undefined);
    // const response = await axios.get("https://b-site.site/schoolmates", {
    //   params: {
    //     count: 10,
    //     page: 0,
    //     name: text
    //   },
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${token}`
    //   }
    // });
  }
  const FriendsList = () => (
    <View style={{ flex: 1 }}>
      <SearchContainer>
        <Image source={IconSearch} style={{ width: 24, height: 24 }} />
        <SearchInput placeholder="검색어를 입력하세요" />
      </SearchContainer>

      <ScrollViewContainer>
        <SectionTitle>즐겨찾기</SectionTitle>
        {allFriends.favorites ? (
          allFriends.favorites.map((friend) => (
            <FriendItem
              key={friend.userId}
              onPress={() =>
                navigation.navigate("FriendProfile", {
                  userId: friend.userId
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
        {allFriends.all ? (
          allFriends.all.map((friend) => (
            <FriendItem
              key={friend.userId}
              onPress={() =>
                navigation.navigate("FriendProfile", {
                  userId: friend.userId
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
          <EmptyText>친구가 없습니다.</EmptyText>
        )}
      </ScrollViewContainer>
    </View>
  );

  const SchoolFriends = () => (
    <View style={{ flex: 1 }}>
      <SearchContainer>
        <Image source={IconSearch} style={{ width: 24, height: 24 }} />
        <SearchInput placeholder="검색어를 입력하세요" onChangeText={handleSearchSchoolmate} value={enteredText} />
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

      <View
        style={{ flex: 1, justifyContent: "flex-start", minHeight: "82%" }} // 추가: minHeight 설정
      >
        <SectionTitle>전체</SectionTitle>
        <SchoolmateList list={schoolFriends.list} fetchMoreData={fetchMoreData} />

        {/* <SchoolmateList list={schoolFriends.list} /> */}
      </View>
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
const ScrollViewContainer = styled(ScrollView)`
  flex: 1;
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
const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 25px;
  margin-right: 12px;
`;
const FriendItem = styled(Pressable)`
  padding-vertical: 8px;
  flex-direction: row;
`;
const EmptyText = styled(Text)`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;
