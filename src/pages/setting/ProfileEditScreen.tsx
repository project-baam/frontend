import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import HeaderRightText from "../../components/common/HeaderRightText";
import { SettingStackParamList } from "../../navigations/SettingStackNavigation";
import { useProfileStore } from "../../store/store";
import useUserStore from "../../store/UserStore";
import { Theme } from "../../styles/theme";

type ProfileEditScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList, "ProfileEditScreen">;
type ProfileEditScreenRouteProp = RouteProp<SettingStackParamList, "ProfileEditScreen">;

interface ProfileEditScreenProps {}

function ProfileEditScreen({}: ProfileEditScreenProps) {
  const navigation = useNavigation<ProfileEditScreenNavigationProp>();
  const route = useRoute<ProfileEditScreenRouteProp>();
  const { fullName, schoolName, grade, className, setFullName, setSchoolName, setGrade, setClassName } = useUserStore();

  const [localName, setLocalName] = useState(fullName);
  const [localSchool, setLocalSchool] = useState(schoolName);
  const [localGrade, setLocalGrade] = useState(grade);
  const [localClass, setLocalClass] = useState(className);

  const [openGrade, setOpenGrade] = useState(false);
  const [gradeItems, setGradeItems] = useState<ItemType<number>[]>([
    { label: "1학년", value: 1 },
    { label: "2학년", value: 2 },
    { label: "3학년", value: 3 }
  ]);

  const [openClass, setOpenClass] = useState(false);
  //해당학교가 몇반까지 있는지 추가해야됨
  const [classItems, setClassItems] = useState<ItemType<number>[]>([
    { label: "1반", value: 1 },
    { label: "2반", value: 2 },
    { label: "3반", value: 3 }
  ]);

  const navigateToSchoolSearch = () => {
    navigation.navigate("SchoolSearchScreen");
  };

  const handleSave = () => {
    setFullName(localName);
    setSchoolName(localSchool);
    setGrade(localGrade);
    setClassName(localClass);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <HeaderRightText>저장</HeaderRightText>
        </TouchableOpacity>
      )
    });
  }, [navigation, handleSave]);

  useEffect(() => {
    if (route.params?.school) {
      setLocalSchool(route.params.school);
    }
  }, [route.params?.school]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setOpenGrade(false);
        setOpenClass(false);
      }}
    >
      <SafeAreaView style={{ backgroundColor: Theme.colors.White, flex: 1 }}>
        <Container>
          <InputContainer>
            <LabelText>이름</LabelText>
            <StyledTextInput value={localName} onChangeText={setLocalName} placeholder="이름" />
          </InputContainer>
          <InputContainer>
            <LabelText>학교</LabelText>
            <TouchableOpacity onPress={navigateToSchoolSearch}>
              <StyledTextInput value={localSchool} placeholder="학교" editable={false} pointerEvents="none" />
            </TouchableOpacity>
          </InputContainer>
          <RowContainer>
            <DropdownContainer style={{ zIndex: 3000 }}>
              <LabelText>학년</LabelText>
              <DropDownPicker
                open={openGrade}
                value={localGrade}
                items={gradeItems}
                setOpen={setOpenGrade}
                setValue={setLocalGrade}
                setItems={setGradeItems}
                placeholder="학년 선택"
                style={pickerStyle}
                dropDownContainerStyle={dropDownContainerStyle}
                closeAfterSelecting={true}
                closeOnBackPressed={true}
                onOpen={() => setOpenClass(false)}
              />
            </DropdownContainer>
            <DropdownContainer style={{ zIndex: 2000 }}>
              <LabelText>반</LabelText>
              <DropDownPicker
                open={openClass}
                value={localClass}
                items={classItems}
                setOpen={setOpenClass}
                setValue={setLocalClass}
                setItems={setClassItems}
                placeholder="반 선택"
                style={pickerStyle}
                dropDownContainerStyle={dropDownContainerStyle}
                closeAfterSelecting={true}
                closeOnBackPressed={true}
                onOpen={() => setOpenGrade(false)}
              />
            </DropdownContainer>
          </RowContainer>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default ProfileEditScreen;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 36px;
`;

const InputContainer = styled.View`
  gap: 8px;
`;

const LabelText = styled.Text`
  font-size: 18px;
`;

const StyledTextInput = styled.TextInput`
  background-color: ${Theme.colors.Gray200};
  padding: 16px;
  font-size: 18px;
  font-weight: 500;
  color: ${Theme.colors.Gray600};
  border-radius: 12px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;

const DropdownContainer = styled.View`
  flex: 1;
  gap: 8px;
`;

const pickerStyle = {
  backgroundColor: Theme.colors.Gray200,
  borderColor: Theme.colors.Gray200,
  borderRadius: 12,
  height: 48
};

const dropDownContainerStyle = {
  borderColor: Theme.colors.Gray200,
  backgroundColor: Theme.colors.Gray200
};
