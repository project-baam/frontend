import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, Pressable, ScrollView } from "react-native";
import { NavigationProp, useNavigation, useFocusEffect } from "@react-navigation/native";
import styled from "@emotion/native";
import { useMeal } from "@/hooks/useMeals";
import MealInfo from "@/components/home/MealInfo";
import { BtnLeft, ChevronRight } from "@/assets/assets";
import DateCarousel from "@/components/home/DateCarousel";
import { HomeStackParamList } from "@/navigations/HomeStackNavigation";
import { Theme } from "@/styles/theme";
import { customAxios } from "@/apis/instance";
import { User } from "../memo/ChatScreen";
import { useFavoriteFriends } from "@/hooks/useFavoriteFriends";
import FavoriteFriends from "@/components/home/FavoriteFriends";
import { HOME_SCREEN } from "@/constants";
import { RootNavigationProp } from "@/navigations/RootNavigation";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const navigateToFriendsList = () => {
    navigation.navigate("Friends", { screen: "FriendListScreen" });
  };

  const navigateToFriendProfile = (userId: number) => {
    navigation.navigate("Friends", {
      screen: "FriendProfile",
      params: { userId }
    });
  };

  const {
    meals,
    isLoading: mealsLoading,
    error: mealsError,
    refetch: refetchMeals
  } = useMeal(userInfo?.schoolId || null, new Date().toISOString().split("T")[0]);

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

  useEffect(
    () => {
      getUserProfile();
      refetchMeals();
      refetchFriends();
    },
    [] //   [friends]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <DateCarousel />
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
              onNavigateToFriendProfile={navigateToFriendProfile}
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
              <MealInfo meals={meals} isLoading={mealsLoading} error={mealsError} />
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
  gap: 10px;
  padding: 0 20px;
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
  color:  ${Theme.colors.Gray900};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.25px;
`;

const EmptyTimeTableBox = styled.View`
  width: 100%;
  height: 270px;
  background-color: #f3f2ff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const EmptyTimeTableBoxLabel = styled.Text`
  font-style: ${Theme.typo.Body_04_Bold};
`;

const AddTimeTableButton = styled(Pressable)`
  width: 170px;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.Violet};
  border-radius: 100px;
`;

const AddTimeTableButtonText = styled.Text`
  font-style: ${Theme.typo.Body_04_Bold};
  color: #fff;
`;

const CustomImage = styled.Image`
  width: 32px;
  height: 32px;
`;

const EmptyMealLabel = styled.Text`
  font-style: ${Theme.typo.Body_04};
  color: ${Theme.colors.Gray600};
  padding: 20px 0;
`;

export default HomeScreen;
