import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { Theme } from "../../styles/theme";
import { Agenda } from "../../types/agenda";
import { CalendarAddScreenNavigationProp } from "../../navigations/CalendarStackNavigation";

interface ItemProps {
  item: Agenda;
  isFirst: boolean;
  isLast: boolean;
}

const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

function AgendaItem(props: ItemProps) {
  const { item, isFirst, isLast } = props;
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
    <ItemContainer onPress={itemPressed} isToday={isToday(item.date)} isFirst={isFirst} isLast={isLast}>
      <ItemDateContainer borderColor={item.color || "green"}></ItemDateContainer>
      <ItemTextContainer>
        <ItemTitleText>{item.title}</ItemTitleText>
        <ItemHourText>{item.hour}</ItemHourText>
      </ItemTextContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled(Pressable)<{ isToday: boolean; isFirst: boolean; isLast: boolean }>`
  padding: 12px 16px;
  background-color: #ffffff;
  flex-direction: row;
  gap: 16px;
  background-color: ${(props) => (props.isToday ? Theme.colors.Gray100 : "#ffffff")};
  border-top-left-radius: ${(props) => (props.isFirst ? "8px" : "0")};
  border-top-right-radius: ${(props) => (props.isFirst ? "8px" : "0")};
  border-bottom-left-radius: ${(props) => (props.isLast ? "8px" : "0")};
  border-bottom-right-radius: ${(props) => (props.isLast ? "8px" : "0")};
`;

const ItemDateContainer = styled(View)<{ borderColor: string }>`
  border-right-width: 2px;
  border-right-color: ${(props) => props.borderColor};
  padding-right: 20px;
  align-items: center;
  gap: 2px;
`;

const ItemDateText = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;

const ItemDayOfWeekText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: grey;
`;

const ItemHourText = styled(Text)`
  color: grey;
`;

const ItemTitleText = styled(Text)`
  color: black;
  font-weight: bold;
  font-size: 16px;
`;

const ItemTextContainer = styled(View)`
  gap: 8px;
`;

export default AgendaItem;
