import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { AgendaList, CalendarProvider, ExpandableCalendar, LocaleConfig, WeekCalendar } from "react-native-calendars";
import IconGear from "../../assets/images/icon_gear.svg";
import { Theme } from "../../styles/theme";
import { CalendarStackParamList } from "../../types/navigation";
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
            sections={ITEMS}
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
