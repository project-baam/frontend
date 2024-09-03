import { useState } from "react";
import { View, Text, Image, SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { IconSearch } from "../../assets/assets";
import styled from "@emotion/native";
import DropDown from "../../components/common/Dropdown";
import ScheduleAddItem from "../../components/home/ScheduleAddItem";

const pillOptions = ["전체", "국어", "수학", "영어", "과학", "사회", "기타"];
const schedules = ["국어", "고전 읽기", "고전과 윤리", "과학사", "기술가정", "가정학", "논리학"];

const AddTimeTableDetailScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? "dark-content" : "light-content"} />
      <Container>
        <SearchInputContainer>
          <SearchInputIcon source={IconSearch} />
          <SearchInput placeholder="Placeholder" />
        </SearchInputContainer>

        <PillContainer>
          {pillOptions.map((option) => (
            <Pill key={option} isActive={option === "전체"}>
              <PillText isActive={option === "전체"}>{option}</PillText>
            </Pill>
          ))}
        </PillContainer>

        <AddScheduleContainer>
          {schedules.map((item) => (
            <ScheduleAddItem key={item} title={item} />
          ))}
        </AddScheduleContainer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: #fff;
  gap: 20px;
`;

const SearchInputContainer = styled.View`
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const SearchInputIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
`;

const PillContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.TouchableOpacity<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ? "#8A7EFF33" : "#f5f5f5")};
  border-radius: 12px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const PillText = styled.Text<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? "#8A7EFF" : "#7B7B7BB2")};
`;

const AddScheduleContainer = styled.View`
  gap: 12px;
`;

export default AddTimeTableDetailScreen;
