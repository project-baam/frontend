import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { Theme } from "../../styles/theme";
import { Agenda } from "../../types/agenda";
import { CalendarAddScreenNavigationProp } from "../../navigations/CalendarStackNavigation";

interface ItemProps {
  item: Agenda;
  showDate: boolean;
}

const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

function AgendaItem(props: ItemProps) {
  const { item, showDate } = props;
  const navigation = useNavigation<CalendarAddScreenNavigationProp>();

  const itemPressed = useCallback(() => {
    navigation.navigate("CalendarAddScreen", { item });
  }, [item, navigation]);

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
  };

  if (isEmpty(item)) {
    return <></>;
  }

  return (
    <RootContainer>
      {showDate && (
        <DateContainer>
          <StyledDOM>{item.date.split("-")[2]}</StyledDOM>
          <StyledDOW>{item.dayOfWeek}</StyledDOW>
        </DateContainer>
      )}
      <ItemContainer type={item.type} onPress={itemPressed} isToday={isToday(item.date)}>
        <TextContainer>
          <StyledTitle>{item.title}</StyledTitle>
          <StyledTime></StyledTime>
        </TextContainer>
        {/* <ItemDateContainer type={item.type}>
          <ItemDateText>{item.date.split("-")[2]}</ItemDateText>
          <ItemDayOfWeekText>{item.dayOfWeek}</ItemDayOfWeekText>
        </ItemDateContainer>
        <ItemTextContainer>
          <ItemTitleText>{item.title}</ItemTitleText>
          <ItemHourText>{item.hour}</ItemHourText>
        </ItemTextContainer> */}
      </ItemContainer>
    </RootContainer>
  );
}

const RootContainer = styled.View`
  flex: 1;
  padding: 12px 16px;
  background-color: #ffffff;
  gap: 16px;
`;

const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledDOM = styled.Text`
  color: ${Theme.colors.Gray900};
  font-family: "Pretendard-Bold";
  font-size: 24px;
  font-weight: 600;
`;

const StyledDOW = styled.Text`
  color: ${Theme.colors.Gray500};
  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-weight: 500;
`;

const ItemContainer = styled(Pressable)<{ type: string; isToday: boolean }>`
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  flex-direction: row;
  gap: 12px;
  background-color: ${(props) => (props.isToday ? Theme.colors.Gray100 : "#ffffff")};
  border-left-width: 2px;
  border-left-color: ${(props) => (props.type === "school" ? "#327CEA" : "class" ? "#F92626" : "#27B560")};
`;

const TextContainer = styled.View`
  gap: 8px;
`;

const StyledTitle = styled.Text`
${Theme.typo.Body_04_Bold};
color: ${Theme.colors.Gray800};
}
`;

const StyledTime = styled.Text`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 16px;
  color: ${Theme.colors.Gray500};
`;

export default AgendaItem;
