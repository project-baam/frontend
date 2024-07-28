import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig, WeekCalendar } from "react-native-calendars";
import AgendaItem from "../mocks/AgendaItem";
import { agendaItems, getMarkedDates } from "../mocks/agendaItems";
import { getTheme } from "../mocks/theme";

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

const ExpandableCalendarScreen = ({ weekView = false }: Props) => {
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: "#0e0909"
  });

  const renderItem = useCallback(({ item, index, section }: { item: any; index: number; section: any }) => {
    const isFirst = index === 0;
    const isLast = index === section.data.length - 1;
    return <AgendaItem key={index} item={item} isFirst={isFirst} isLast={isLast} />;
  }, []);

  return (
    <CalendarProvider date={ITEMS[1]?.title} showTodayButton theme={todayBtnTheme.current}>
      <View style={{ flex: 1 }}>
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
        <View style={styles.agendaContainer}>
          <AgendaList
            sections={ITEMS}
            renderSectionHeader={() => <></>}
            renderItem={renderItem}
            sectionStyle={styles.section}
            keyExtractor={(item, index) => item.date + index}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </View>
      </View>
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendarBackground: {
    backgroundColor: "gray"
  },
  calendar: {
    paddingHorizontal: 20
  },
  header: {
    backgroundColor: "#ffffff"
  },
  section: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "lightgrey"
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  sectionContentContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16
  },
  itemWrapper: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600"
  },
  nonCurrentMonthDateText: {
    color: "grey"
  },
  agendaContainer: {
    flex: 1,
    padding: 16
  },
  dotsContainer: {
    position: "absolute",
    bottom: -8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    marginHorizontal: 1
  },
  dayContainer: {
    position: "relative"
  },
  selectedDay: {
    backgroundColor: "black"
  },
  today: {
    backgroundColor: "black"
  },
  selectedDateText: {
    color: "white"
  },
  todayDateText: {
    color: "white"
  }
});
