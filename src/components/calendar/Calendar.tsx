import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig, WeekCalendar } from "react-native-calendars";
import IconGear from "../../assets/images/icon_gear.svg";
import { CalendarStackParamList } from "../../navigations/CalendarStackNavigation";
import useAuthStore from "../../store/UserAuthStore";
import { Theme } from "../../styles/theme";
import AgendaItem from "./AgendaItem";
import { getTheme } from "./calendarTheme";
import { agendaItems, getMarkedDates } from "./mocks/agendaItems";

LocaleConfig.locales["kr"] = {
  monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"]
};
LocaleConfig.defaultLocale = "kr";

const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}
interface ListItem {
  datetime: string;
  id: number;
  memo: string | null;
  title: string;
  type: string;
}

interface GroupedItem {
  title: number;
  data: ListItem[];
}

function Calendar({ weekView = false }: Props) {
  const navigation = useNavigation<NavigationProp<CalendarStackParamList>>();
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: "#0e0909"
  });

  const renderItem = useCallback(({ item, index, section }: { item: any; index: number; section: any }) => {
    const isFirst = index === 0;
    const isLast = index === section.data.length - 1;
    const uniqueKey = `${item.date}_${item.hour}_${index}`;

    return <AgendaItem key={uniqueKey} item={item} isFirst={isFirst} isLast={isLast} />;
  }, []);

  const { token } = useAuthStore();
  const [item, setItem] = useState<GroupedItem[]>([]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    // 이벤트 가져오기
    async function fetchData() {
      const response = await axios.get(`https://b-site.site/calendar/${year}/${month}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      // 일정을 날짜별로 그룹화
      const groupedData = response.data.list.reduce((acc: { [key: string]: ListItem[] }, currentItem: ListItem) => {
        if (currentItem.datetime) {
          const date = currentItem.datetime.split(" ")[0];

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(currentItem);
        }

        return acc;
      }, {});

      const formattedData = Object.keys(groupedData).map((date, index) => ({
        title: index + 1,
        data: groupedData[date]
      }));

      setItem(formattedData);
    }
    fetchData();
  }, []);

  return (
    <CalendarProvider date={ITEMS[1]?.title} showTodayButton theme={todayBtnTheme.current}>
      <StyledView>
        {weekView ? (
          <WeekCalendar markingType="multi-dot" theme={theme.current} firstDay={0} markedDates={marked.current} />
        ) : (
          <ExpandableCalendar
            markingType="multi-dot"
            theme={{ ...theme.current }}
            firstDay={0}
            markedDates={marked.current}
            closeOnDayPress={false}
            showSixWeeks
            monthFormat={"yyyy년 M월"}
          />
        )}
        <AgendaContainer>
          <AgendaList
            sections={item}
            renderSectionHeader={() => <></>}
            renderItem={renderItem}
            sectionStyle={styles.section}
            keyExtractor={(item, index) => item.id + index.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
          <AddButton onPress={() => navigation.navigate("CalendarAddScreen", {})}>
            <IconGear />
          </AddButton>
        </AgendaContainer>
      </StyledView>
    </CalendarProvider>
  );
}

export default Calendar;

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
`;

const AgendaContainer = styled.View`
  background-color: white;
  flex: 1;
  padding: 16px;
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
