import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import BtnRight from "../../assets/images/btn_right.svg";
import Knob from "../../assets/images/knob.svg";
import Dialog from "../../components/common/Dialog";
import Switch from "../../components/common/Switch";
import { SettingStackParamList } from "../../navigations/SettingStackNavigation";
import { useProfileStore } from "../../store/store";
import { Theme } from "../../styles/theme";

interface SettingHomeScreenProps {}

function SettingHomeScreen({}: SettingHomeScreenProps) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();
  const { name, school } = useProfileStore();

  const handleToggleSwitch = () => {
    setIsSwitchOn((previousState) => !previousState);
  };

  const handleShowDialog = () => {
    setIsDialogVisible(true);
  };

  const handleHideDialog = () => {
    setIsDialogVisible(false);
  };

  const handleConfirmDialog = () => {
    //[ ]TODO : 회원 탈퇴 로직 추가
    handleHideDialog();
  };

  const customerServiceOptions = [
    {
      label: "서비스약관",
      action: () => navigation.navigate("TermsOfServiceScreen")
    },
    {
      label: "회원 탈퇴하기",
      action: handleShowDialog
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProfileButton onPress={() => navigation.navigate("ProfileScreen")}>
          <Knob width={48} height={48} style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: "red" }} />
          <UserInfo>
            <NameText>{name}</NameText>
            <SchoolText>{school}</SchoolText>
          </UserInfo>
          <BtnRight style={{ marginLeft: "auto" }} />
        </ProfileButton>
        <Divider />
        <SectionContainer>
          <SectionTitleText>권한설정</SectionTitleText>
          <AlertContainer>
            <AlertInnerContainer>
              <AlertText>알림</AlertText>
              <AlertDescription>Baam에서 제공하는 알림에 동의합니다.</AlertDescription>
            </AlertInnerContainer>
            <Switch isSwitchOn={isSwitchOn} onToggle={handleToggleSwitch} />
          </AlertContainer>
        </SectionContainer>
        <Divider />
        <SectionContainer>
          <SectionTitleText>고객센터</SectionTitleText>
          <CustomerContainer>
            {customerServiceOptions.map((option, index) => (
              <StyledPressable key={index} onPress={option.action}>
                <ButtonText>{option.label}</ButtonText>
                <BtnRight width={24} height={24} />
              </StyledPressable>
            ))}
          </CustomerContainer>
        </SectionContainer>
      </Container>
      {isDialogVisible && (
        <Dialog
          isVisible={isDialogVisible}
          title="정말 탈퇴하시겠어요?"
          message="탈퇴하시게 되면 추후 서비스 이용이 어렵습니다. 추후 재가입하더라도 기존 데이터는 모두 삭제됩니다."
          onConfirm={handleConfirmDialog}
          onCancel={handleHideDialog}
        />
      )}
    </SafeAreaView>
  );
}

export default SettingHomeScreen;

const Container = styled.View`
  gap: 12px;
  background-color: ${Theme.colors.White};
  height: 100%;
`;

const ProfileButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

const UserInfo = styled.View`
  gap: 6px;
`;

const NameText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const SchoolText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const Divider = styled.View`
  height: 12px;
  background-color: ${Theme.colors.Gray100};
`;

const SectionContainer = styled.View`
  gap: 32px;
  padding: 16px;
  background-color: ${Theme.colors.White};
`;

const SectionTitleText = styled.Text`
  font-size: 18px;
`;

const AlertContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;

const AlertInnerContainer = styled.View`
  gap: 8px;
`;

const AlertText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

const AlertDescription = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
`;

const CustomerContainer = styled.View`
  gap: 32px;
`;

const StyledPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
