import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../navigations/HomeStackNavigation";

const timeSlots = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const weekdays = ["월", "화", "수", "목", "금"];

const Timetable = () => {
  const router = useNavigation<HomeScreenNavigationProp>();

  // 셀이 클릭되었을 때 호출되는 함수
  const handleCellPress = (day: string, timeSlot: string) => {
    console.log(`${day}요일, ${timeSlot}`);
    router.push("AddTimeTableDetailScreen");
  };

  return (
    <ScrollView>
      <Container>
        <Table>
          {/* Y Axis */}
          <YAxisColumn>
            <YAxisLabel>
              <YAxisText />
            </YAxisLabel>
            {timeSlots.map((time, index) => (
              <YAxisLabel key={index}>
                <YAxisText>{time}</YAxisText>
              </YAxisLabel>
            ))}
          </YAxisColumn>

          {/* Table Data */}
          {weekdays.map((day, dayIndex) => (
            <Column key={dayIndex}>
              {/* X Axis Header */}
              <Cell isHeader>
                <HeaderText>{day}</HeaderText>
              </Cell>

              {/* Table Content */}
              {timeSlots.map((time, rowIndex) => (
                <Cell key={time} onPress={() => handleCellPress(day, time)}>
                  <CellText>수업</CellText>
                </Cell>
              ))}
            </Column>
          ))}
        </Table>
      </Container>
    </ScrollView>
  );
};

export default Timetable;

// Styled components
const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Table = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Column = styled.View`
  flex: 1;
`;

const YAxisColumn = styled.View`
  flex: 0.5;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.TouchableOpacity<{ isHeader?: boolean }>`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.isHeader ? "none" : "1px solid #ddd")};
`;

const HeaderText = styled.Text`
  font-weight: bold;
  color: #333;
`;

const CellText = styled.Text`
  color: #333;
`;

const YAxisLabel = styled.View`
  flex: 1;
  height: 40px;
  align-items: center;
  padding-right: 10px;
  justify-content: center;
`;

const YAxisText = styled.Text`
  font-weight: bold;
  color: #333;
`;
