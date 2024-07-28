import styled from "@emotion/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Chip from "../components/common/Chip";
import { Theme } from "../styles/theme";
import { CalendarAddScreenNavigationProp, CalendarAddScreenRouteProp } from "../types/navigation";

interface CalendarAddScreenProps {}

function CalendarAddScreen({}: CalendarAddScreenProps) {
  const route = useRoute<CalendarAddScreenRouteProp>();
  const navigation = useNavigation<CalendarAddScreenNavigationProp>();
  const { item } = route.params || {};

  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    memo: "",
    selectedChip: null as "학교 일정" | "수업별 일정" | "개별 일정" | null
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useEffect(() => {
    if (item) {
      const [hours, minutes] = item.hour.split(":");
      const initialDate = new Date(item.date);
      initialDate.setHours(parseInt(hours));
      initialDate.setMinutes(parseInt(minutes));

      setFormData({
        title: item.title || "",
        date: initialDate,
        memo: item.memo || "",
        selectedChip:
          item.key === "school_event" ? "학교 일정" : item.key === "class_schedule" ? "수업별 일정" : "개별 일정"
      });
    }
  }, [item]);

  const handleChipPress = (chip: "학교 일정" | "수업별 일정" | "개별 일정") => {
    setFormData((prev) => ({
      ...prev,
      selectedChip: chip === formData.selectedChip ? null : chip
    }));
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setFormData((prev) => ({
      ...prev,
      date: selectedDate
    }));
    hideDatePicker();
  };

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDateToKorean = (date: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const adjustedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}년 ${month}월 ${day}일 (${weekday}) ${ampm} ${adjustedHours}:${formattedMinutes}`;
  };

  return (
    <Container>
      <ChipRow>
        <TouchableOpacity
          onPress={() => handleChipPress("학교 일정")}
          style={{ opacity: formData.selectedChip === "학교 일정" ? 1 : 0.2 }}
        >
          <Chip
            size="small"
            backGroundColor="#E199F0"
            borderColor="#E199F0"
            textColor={Theme.colors.White}
            borderRadius="circle"
          >
            학교 일정
          </Chip>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChipPress("수업별 일정")}
          style={{ opacity: formData.selectedChip === "수업별 일정" ? 1 : 0.2 }}
        >
          <Chip
            size="small"
            backGroundColor="#8A7EFF"
            borderColor="#8A7EFF"
            textColor={Theme.colors.White}
            borderRadius="circle"
          >
            수업별 일정
          </Chip>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChipPress("개별 일정")}
          style={{ opacity: formData.selectedChip === "개별 일정" ? 1 : 0.2 }}
        >
          <Chip
            size="small"
            backGroundColor="#A6E7DF"
            borderColor="#A6E7DF"
            textColor={Theme.colors.White}
            borderRadius="circle"
          >
            개별 일정
          </Chip>
        </TouchableOpacity>
      </ChipRow>
      <View style={{ gap: 12 }}>
        <InputWrapper>
          <LabelContainer>
            <Label>제목</Label>
            <StyledTextInput value={formData.title} onChangeText={(text) => handleInputChange("title", text)} />
          </LabelContainer>
        </InputWrapper>
        <TouchableOpacity onPress={showDatePicker}>
          <InputWrapper>
            <LabelContainer>
              <Label>날짜</Label>
              <InputContainer>
                <DateText>{formatDateToKorean(formData.date)}</DateText>
              </InputContainer>
            </LabelContainer>
          </InputWrapper>
        </TouchableOpacity>
        <StyledMemoInput
          placeholder="메모"
          value={formData.memo}
          onChangeText={(text) => handleInputChange("memo", text)}
          multiline
          numberOfLines={10}
        />
        <Button>
          <ButtonText>작성 완료</ButtonText>
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={formData.date}
          locale="ko-KR"
          confirmTextIOS="확인"
          cancelTextIOS="취소"
        />
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.Gray100};
  padding: 16px;
  gap: 16px;
`;

const ChipRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const InputWrapper = styled.View`
  background-color: ${Theme.colors.White};
  border: 1px solid ${Theme.colors.Gray300};
  border-radius: 8px;
  padding: 0 16px;
  justify-content: center;
  height: 51px;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${Theme.colors.Gray700};
  margin-right: 12px;
  font-weight: 600;
`;

const InputContainer = styled.View`
  flex: 1;
  background-color: ${Theme.colors.White};
  padding: 0;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  font-size: 16px;
  flex: 1;
  padding: 0;
  margin: 0;
`;
const StyledMemoInput = styled.TextInput`
  font-size: 16px;
  background-color: ${Theme.colors.White};
  border: 1px solid ${Theme.colors.Gray300};
  border-radius: 8px;
  padding: 16px;
  justify-content: center;
  height: 350px;
`;

const DateText = styled.Text`
  font-size: 16px;
`;

const Button = styled.Pressable`
  margin-top: 21px;
  background-color: ${Theme.colors.Primary};
  border-radius: 24px;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${Theme.colors.White};
  font-size: 16px;
  font-weight: 500;
`;

export default CalendarAddScreen;
