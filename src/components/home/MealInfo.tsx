import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { Theme } from "../../styles/theme";
import styled from "@emotion/native";
import { MealData } from "@/types/meal";
import { CustomImage } from "@/pages/home/HomeScreen";
import { BtnLeft } from "@/assets/assets";

interface MealInfoProps {
  meals: MealData[];
  isLoading: boolean;
  error: Error | null;
}

const MealInfo: React.FC<MealInfoProps> = ({ meals, isLoading, error }) => {
  const [currentMealIndex, setCurrentMealIndex] = useState<number>(0);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 9) {
      setCurrentMealIndex(0); // 조식
    } else if (currentHour >= 9 && currentHour < 14) {
      setCurrentMealIndex(1); // 중식
    } else {
      setCurrentMealIndex(2); // 석식
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingView>
        <LoadingText>Loading...</LoadingText>
      </LoadingView>
    );
  }

  if (error) {
    return (
      <ErrorView>
        <ErrorText>급식 정보를 불러오는데 실패했습니다.</ErrorText>
      </ErrorView>
    );
  }

  if (!meals || !meals.length) {
    return (
      <EmptyView>
        <EmptyText>오늘은 급식 정보가 없어요.</EmptyText>
      </EmptyView>
    );
  }

  const mealTypes: ("조식" | "중식" | "석식")[] = ["조식", "중식", "석식"];
  const currentMeal = meals.find((meal) => meal.type === mealTypes[currentMealIndex]);

  const handlePrevMeal = () => {
    setCurrentMealIndex((prev) => (prev > 0 ? prev - 1 : mealTypes.length - 1));
  };

  const handleNextMeal = () => {
    setCurrentMealIndex((prev) => (prev < mealTypes.length - 1 ? prev + 1 : 0));
  };

  return (
    <Container>
      <Content>
        <Pressable onPress={handlePrevMeal}>
          <CustomImage source={BtnLeft} style={{ transform: [{ scaleX: -1 }, { rotateY: "180deg" }] }} />
        </Pressable>
        <MealContent>
          <MealTitle>{`${new Date().toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit"
          })} ${currentMeal?.type || mealTypes[currentMealIndex]}`}</MealTitle>
          <MealMenu>{currentMeal?.menu ? currentMeal.menu.join("\n") : "정보 없음"}</MealMenu>
        </MealContent>
        <Pressable onPress={handleNextMeal}>
          <CustomImage source={BtnLeft} style={{ transform: [{ scaleX: -1 }] }} />
        </Pressable>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${Theme.colors.Gray100};
  border-radius: 10px;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-style: ${Theme.typo.Body_04_Bold};
  color: ${Theme.colors.Gray800};
`;

const ArrowButton = styled.TouchableOpacity`
  padding: 10px;
`;

const MealContent = styled.View`
  flex: 1;
  align-items: center;
`;

const MealTitle = styled.Text`
  font-style: ${Theme.typo.Body_04_Bold};
  color: ${Theme.colors.Gray800};
  margin-bottom: 5px;
`;

const MealMenu = styled.Text`
  font-style: ${Theme.typo.Body_04};
  color: ${Theme.colors.Gray700};
  text-align: center;
`;

const LoadingView = styled.View`
  padding: 20px;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: ${Theme.colors.Gray700};
`;

const ErrorView = styled.View`
  padding: 20px;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${Theme.colors.Primary};
`;

const EmptyView = styled.View`
  padding: 20px;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: ${Theme.colors.Gray700};
`;

export default MealInfo;
