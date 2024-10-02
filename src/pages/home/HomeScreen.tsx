import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Pressable, ScrollView, View, Text, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styled from "@emotion/native";
import { useMeal } from "@/hooks/useMeals";
import MealInfo from "@/components/home/MealInfo";
import { BtnLeft, ChevronRight } from "@/assets/assets";
import DateCarousel from "@/components/home/DateCarousel";
import { Theme } from "@/styles/theme";
import { customAxios } from "@/apis/instance";
import { User } from "../memo/ChatScreen";
import { useFavoriteFriends } from "@/hooks/useFavoriteFriends";
import FavoriteFriends from "@/components/home/FavoriteFriends";
import { HOME_SCREEN } from "@/constants";
import { RootNavigationProp } from "@/navigations/RootNavigation";
import moment from "moment";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const navigateToFriendsList = () => {
    navigation.navigate("Friends", { screen: "FriendListScreen" });
  };

  const {
    meals,
    isLoading: mealsLoading,
    error: mealsError,
    refetch: refetchMeals
  } = useMeal(userInfo?.schoolId || null, selectedDate);

  const {
    friends,
    loading: friendsLoading,
    error: friendsError,
    refetch: refetchFriends,
    loadMore: loadMoreFriends,
    hasMore: hasMoreFriends,
    totalCount: totalFavoriteFriends
  } = useFavoriteFriends(HOME_SCREEN.FAVORITE_FRIENDS_COUNT);

  const getUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await customAxios.get("user");
      setUserInfo(response.data);
    } catch (error: any) {
      console.error(error.message);
      console.error(error.stack);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserProfile();
      refetchFriends(); // 화면에 돌아올 때마다 친구 목록을 다시 불러옴
    }, [getUserProfile, refetchFriends])
  );

  useEffect(() => {
    refetchMeals();
  }, [selectedDate]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFA" }}>
      <Container>
        <DateCarousel selectedDate={selectedDate} onDateChange={handleDateChange} />
        <ScrollView>
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>시간표</SectionHeaderTitle>
              <Pressable>
                <CustomImage source={BtnLeft} style={{ transform: [{ scaleX: -1 }] }} />
              </Pressable>
            </SectionHeader>
            <EmptyTimeTableBox>
              <EmptyTimeTableBoxLabel>아직 시간표가 없어요!</EmptyTimeTableBoxLabel>
              <AddTimeTableButton>
                <AddTimeTableButtonText>시간표 추가하기</AddTimeTableButtonText>
                <CustomImage source={ChevronRight} />
              </AddTimeTableButton>
            </EmptyTimeTableBox>
          </Section>
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>친한 친구들</SectionHeaderTitle>
              <Pressable onPress={navigateToFriendsList}>
                <CustomImage source={BtnLeft} style={{ transform: [{ scaleX: -1 }] }} />
              </Pressable>
            </SectionHeader>
            <FavoriteFriends
              friends={friends}
              loading={friendsLoading}
              error={friendsError}
              onLoadMore={loadMoreFriends}
              hasMore={hasMoreFriends}
              totalCount={totalFavoriteFriends}
            />
          </Section>
          <Section>
            <SectionHeader>
              <SectionHeaderTitle>오늘의 급식</SectionHeaderTitle>
            </SectionHeader>
            {loading ? (
              <EmptyMealLabel>사용자 정보를 불러오는 중...</EmptyMealLabel>
            ) : userInfo?.schoolId ? (
              <MealInfo meals={meals} isLoading={mealsLoading} error={mealsError} date={selectedDate} />
            ) : (
              <EmptyMealLabel>학교 정보가 없습니다.</EmptyMealLabel>
            )}
          </Section>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  gap: 20px;
`;

const Section = styled.View`
  width: 100%;
  gap: 12px;
  padding: 0 16px;
  align-items: center;
`;

const SectionHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const SectionHeaderTitle = styled.Text`
  color: #262626;
  font-family: "Pretendard";
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
`;

const EmptyTimeTableBox = styled.View`
  width: 100%;
  height: 267px;
  background-color: #f3f2ff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const EmptyTimeTableBoxLabel = styled.Text`
  color: #555555;
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;

const AddTimeTableButton = styled(Pressable)`
  padding: 16px 14px 16px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #8a7eff;
  border-radius: 56px;
`;

const AddTimeTableButtonText = styled.Text`
  color: white;
  font-family: "Pretendard";
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  margin-right: 6px;
`;

const CustomImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const EmptyMealLabel = styled.Text`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: #7b7b7b;
  padding: 20px 0;
`;

export default HomeScreen;
