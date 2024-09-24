import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig } from "react-native-calendars";
import { Positions } from "react-native-calendars/src/expandableCalendar";
import { MarkedDates } from "react-native-calendars/src/types";
import IconGear from "../../assets/images/icon_gear.svg";
import { CalendarStackParamList } from "../../navigations/CalendarStackNavigation";
import useAuthStore from "../../store/UserAuthStore";
import { Theme } from "../../styles/theme";
import AgendaItem from "./AgendaItem";

// 달력 설정
LocaleConfig.locales["kr"] = {
  monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"]
};
LocaleConfig.defaultLocale = "kr";

interface ListItem {
  datetime: string;
  id: number;
  memo: string | null;
  title: string;
  type: string;
}

interface FormattedItem {
  title: string;
  data: {
    id: number;
    memo: string | null;
    title: string;
    type: string;
    dayOfWeek: string;
    time: string;
  }[];
}

function CustomCalendar() {
  // state
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [item, setItem] = useState<ListItem[]>([]);
  const [marked, setMarked] = useState<MarkedDates>({});
  const [formattedData, setFormattedData] = useState<FormattedItem[]>([]);

  // store
  const { token } = useAuthStore();

  const navigation = useNavigation<NavigationProp<CalendarStackParamList>>();

  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    const isFirst = index === 0;
    const uniqueKey = `${item.date}_${item.hour}_${index}`;

    return <AgendaItem key={uniqueKey} item={item} showDate={isFirst} />;
  }, []);

  useEffect(() => {
    // 이벤트 가져오기
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    async function fetchData() {
      const response = await axios.get(`https://b-site.site/calendar/${year}/${month}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      setItem(response.data.list);
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    // item 데이터가 업데이트된 후 formattedData 설정
    if (item.length > 0) {
      const newFormattedData: FormattedItem[] = item.reduce((acc: FormattedItem[], currentItem: ListItem) => {
        const [title, time] = currentItem.datetime.split(" ");
        const existingDateTime = acc.find((item) => item.title === title);

        // 요일 구하기
        function getDayOfWeek(dateString: string) {
          const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
          const date = new Date(dateString);
          return daysOfWeek[date.getDay()];
        }

        const newDateItem = {
          id: currentItem.id,
          memo: currentItem.memo,
          title: currentItem.title,
          type: currentItem.type,
          dayOfWeek: getDayOfWeek(title),
          date: title,
          time
        };

        if (existingDateTime) {
          existingDateTime.data.push(newDateItem);
        } else {
          acc.push({
            title,
            data: [newDateItem]
          });
        }

        return acc;
      }, []);

      setFormattedData(newFormattedData); // formattedData 상태 업데이트
    }
  }, [item]); // item이 변경될 때마다 실행

  const filteredItems = formattedData.filter((item) => item.title === selectedDate);

  useEffect(() => {
    // formattedData가 준비된 후 marked 설정
    if (formattedData.length > 0) {
      const markedDates = getMarkedDates(formattedData);
      setMarked(markedDates); // marked 상태 업데이트
    }
  }, [formattedData]); // formattedData가 변경될 때마다 실행

  function getMarkedDates(data: FormattedItem[]): MarkedDates {
    const marked: MarkedDates = {};
    data.forEach((item) => {
      const dots = item.data.map((event) => {
        return { key: event.type, color: getDotColor(event.type) };
      });

      if (item.data.length > 0) {
        marked[item.title] = {
          marked: true,
          dots: dots.slice(0, 3)
        };
      } else {
        marked[item.title] = { disabled: true };
      }
    });

    return marked;
  }

  function getDotColor(key: string) {
    switch (key) {
      case "school":
        return "#327CEA";
      case "class":
        return "#F92626";
      case "personal":
        return "#27B560";
      default:
        return "grey";
    }
  }

  return (
    <StyledView>
      <CalendarProvider date={new Date().toISOString().split("T")[0]}>
        <ExpandableCalendar
          markingType="multi-dot"
          theme={{
            selectedDayTextColor: Theme.colors.White,
            selectedDayBackgroundColor: Theme.colors.Gray900,
            todayTextColor: Theme.colors.Gray900,
            dayTextColor: Theme.colors.Gray900,
            textDisabledColor: "#d9e1e8",
            arrowColor: Theme.colors.Black,
            textDayFontFamily: "Pretendard-Medium",
            textMonthFontFamily: "EsaManruMedium",
            textDayHeaderFontFamily: "EsaManruMedium",
            monthTextColor: Theme.colors.Black
          }}
          firstDay={0}
          markedDates={marked}
          closeOnDayPress={false}
          showSixWeeks
          monthFormat={"M월"}
          initialPosition={Positions.OPEN}
          disablePan
          hideKnob
          style={{
            paddingBottom: 50
          }}
          onDayPress={(day) => setSelectedDate(day.dateString)}
        />
        <AgendaContainer>
          <AgendaList
            sections={filteredItems}
            renderItem={renderItem}
            sectionStyle={styles.section}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
          <AddButton onPress={() => navigation.navigate("CalendarAddScreen", {})}>
            <IconGear />
          </AddButton>
        </AgendaContainer>
      </CalendarProvider>
    </StyledView>
  );
}

export default CustomCalendar;

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "lightgrey"
  }
});

const StyledView = styled.View`
  flex: 1;
  background-color: white;
`;

const AgendaContainer = styled.View`
  background-color: white;
  flex: 1;
  padding: 20px 16px;
  border-top-width: 2px;
  border-top-color: ${Theme.colors.Gray200};
`;

const AddButton = styled.Pressable`
  width: 48px;
  height: 48px;
  position: absolute;
  bottom: 72px;
  right: 16px;
  background-color: ${Theme.colors.Primary};
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  margin-top: 16px;
`;
