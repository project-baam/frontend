import styled from "@emotion/native";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Chip from "../../components/common/Chip";
import { CalendarAddScreenRouteProp, CalendarStackParamList } from "../../navigations/CalendarStackNavigation";
import useCalendarStore from "../../store/calendar/UserCalendarStore";
import useAuthStore from "../../store/UserAuthStore";
import { Theme } from "../../styles/theme";

interface CalendarAddScreenProps {}

function CalendarAddScreen({}: CalendarAddScreenProps) {
  // store
  const { token } = useAuthStore();
  const { setAgenda } = useCalendarStore();
  const route = useRoute<CalendarAddScreenRouteProp>();
  const { item } = route.params || {};

  console.log(item);

  const navigation = useNavigation<NavigationProp<CalendarStackParamList>>();

  const [formData, setFormData] = useState({
    subjectName: "",
    title: "",
    date: new Date(),
    memo: "",
    selectedChip: null as "school" | "class" | "personal" | null
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useEffect(() => {
    if (item) {
      const [hours, minutes] = item.time.split(":");
      const initialDate = new Date(item.date);
      initialDate.setHours(parseInt(hours));
      initialDate.setMinutes(parseInt(minutes));

      setFormData({
        subjectName: item.subjectName || "",
        title: item.title || "",
        date: initialDate,
        memo: item.memo || "",
        selectedChip: item.type === "school" ? "school" : item.type === "class" ? "class" : "personal"
      });
    }
  }, [item]);

  const handleChipPress = (chip: "school" | "class" | "personal") => {
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

  // 일정 생성
  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://b-site.site/calendar/event",
        {
          datetime: formData.date,
          title: formData.title,
          type: formData.selectedChip,
          memo: formData.memo,
          subjectName: formData.subjectName
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAgenda([
        {
          datetime: "2024-09-30 04:12:00",
          id: 20324,
          memo: formData.memo,
          title: formData.title,
          type: "test",
          subjectname: null
        }
      ]);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ChipRow>
        <TouchableOpacity onPress={() => handleChipPress("school")}>
          <Chip
            size="medium"
            backGroundColor={formData.selectedChip === "school" ? "#E6ECF5" : "#F8F8F8"}
            borderColor={formData.selectedChip === "school" ? "#E6ECF5" : "#F8F8F8"}
            textColor={formData.selectedChip === "school" ? "#327CEA" : "#7B7B7BB2"}
            borderRadiusType="circle"
          >
            학교 일정
          </Chip>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChipPress("class")}>
          <Chip
            size="medium"
            backGroundColor={formData.selectedChip === "class" ? "#F5E0E0" : "#F8F8F8"}
            borderColor={formData.selectedChip === "class" ? "#F5E0E0" : "#F8F8F8"}
            textColor={formData.selectedChip === "class" ? "#F92626B2" : "#7B7B7BB2"}
            borderRadiusType="circle"
          >
            수업별 일정
          </Chip>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChipPress("personal")}>
          <Chip
            size="medium"
            backGroundColor={formData.selectedChip === "personal" ? "#DFF2E1" : "#F8F8F8"}
            borderColor={formData.selectedChip === "personal" ? "#DFF2E1" : "#F8F8F8"}
            textColor={formData.selectedChip === "personal" ? "#27B560" : "#7B7B7BB2"}
            borderRadiusType="circle"
          >
            개별 일정
          </Chip>
        </TouchableOpacity>
      </ChipRow>
      <View style={{ gap: 12 }}>
        {formData.selectedChip === "class" && (
          <InputWrapper>
            <LabelContainer>
              <Label>과목</Label>
              <StyledTextInput
                value={formData.subjectName}
                onChangeText={(text) => handleInputChange("subjectName", text)}
              />
            </LabelContainer>
          </InputWrapper>
        )}
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
        <Button
          onPress={() => {
            handleSubmit();
          }}
        >
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
  background-color: ${Theme.colors.White};
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
