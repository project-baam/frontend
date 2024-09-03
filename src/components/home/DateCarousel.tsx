import React, { useState, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import moment, { Moment } from "moment";
import DateCarouselItem from "./DateCarouselItem";
import styled from "@emotion/native";
import { Theme } from "../../styles/theme";
import "moment/locale/ko";

moment.locale("ko");

type DateItem = Moment;

const generateDatesForMonth = (currentMonth: Moment): DateItem[] => {
  const startOfMonth = currentMonth.clone().startOf("month"); // 해당 월의 첫날
  const endOfMonth = currentMonth.clone().endOf("month"); // 해당 월의 마지막 날
  const datesArray: DateItem[] = [];

  let currentDate = startOfMonth;
  while (currentDate.isSameOrBefore(endOfMonth, "day")) {
    datesArray.push(moment(currentDate));
    currentDate.add(1, "day");
  }

  return datesArray;
};

const DateCarousel: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment());
  const [dates, setDates] = useState<DateItem[]>(generateDatesForMonth(currentMonth));
  const flatListRef = useRef<FlatList<DateItem>>(null);

  const todayIndex = dates.findIndex((date) => date.isSame(moment(), "day"));

  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = currentMonth.clone().add(direction === "next" ? 1 : -1, "month");
    setCurrentMonth(newMonth);
    setDates(generateDatesForMonth(newMonth));
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false }); // 월 변경 시 리스트를 처음으로 스크롤
  };

  const handleItemPress = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewOffset: 0,
        viewPosition: 0.25
      });
    }
  };

  const renderItem = ({ item, index }: { item: DateItem; index: number }) => {
    return <DateCarouselItem item={item} onPress={() => handleItemPress(index + 1)} />;
  };

  return (
    <Container>
      <MonthToolbar>
        <Pressable onPress={() => handleMonthChange("prev")}>
          <CustomImage source={require("../../assets/images/btn_left.png")} />
        </Pressable>
        <MonthToolBarTitle>{currentMonth.format("MMMM")}</MonthToolBarTitle>
        <Pressable onPress={() => handleMonthChange("prev")}>
          <CustomImage source={require("../../assets/images/btn_left.png")} style={{ transform: [{ scaleX: -1 }] }} />
        </Pressable>
      </MonthToolbar>

      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.format("YYYY-MM-DD")}-${index}`}
        horizontal
        initialScrollIndex={todayIndex}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 80 * 2 }}
        snapToAlignment="center"
        snapToInterval={80}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index
        })}
        style={{ flexGrow: 0 }}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex-shrink: 1;
  gap: 20px;
`;

const MonthToolbar = styled(View)`
  padding: 0 16px;
  height: 30px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MonthToolBarTitle = styled(Text)`
  font-style: ${Theme.typo.Heading_01};
`;

const CustomImage = styled(Image)`
  width: 32px;
  height: 32px;
`;

export default DateCarousel;
