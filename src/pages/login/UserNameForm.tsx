import styled from "@emotion/native";
import { Theme } from "../../styles/theme";
import OutSideLabelInput from "../../components/common/input/OutsideLabelInput";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import useUserStore from "../../store/UserStore";

type UserNameFormProps = StackScreenProps<SignUpStackParamList, "UserNameForm">;

export default function UserNameForm({ navigation }: UserNameFormProps) {
  const { fullName, setFullName } = useUserStore((state) => state);

  let active = false;

  if (fullName !== "" && fullName.trim().length > 0) {
    active = true;
  }

  return (
    <RootContainer>
      <TextContainer>
        <Title>실명을 입력해주세요.</Title>
        <SubTitle style={{ marginTop: 8 }}>실명을 입력하지 않을 경우</SubTitle>
        <SubTitle>서비스 이용에 제한이 있을 수 있어요.</SubTitle>
      </TextContainer>
      <OutSideLabelInput
        placeholder="실명"
        value={fullName}
        onClear={() => {
          setFullName("");
        }}
        onUpdateValue={setFullName}
      />
      <ButtonContainer active={active}>
        <Pressable
          onPress={() => {
            navigation.navigate("UserProfileForm");
          }}
          disabled={!active}
        >
          <View>
            <ButtonText active={active}>다음</ButtonText>
          </View>
        </Pressable>
      </ButtonContainer>
    </RootContainer>
  );
}

const RootContainer = styled.View`
  flex: 1;
  padding-top: 32px;
  padding-horizontal: 16px;
  background-color: ${Theme.colors.White};
`;

const TextContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 107px;
`;

const Title = styled.Text`
  font-family: "Pretendard-Bold";
  font-size: 20px;
  line-height: 24px;
  color: ${Theme.colors.Gray900};
`;

const SubTitle = styled.Text`
  font-family: "Pretendard-Medium";
  font-size: 16px;
  line-height: 19px;
  color: ${Theme.colors.Gray900};
`;

const ButtonContainer = styled.View<{ active: boolean }>`
  width: 100%;
  position: absolute;
  left: 16px;
  bottom: 24px;
  height: 52px;
  padding: 16px 12px;
  border-radius: 24px;
  background-color: ${({ active }) => (active ? "#8A7EFF" : "#F3F2FF")};
`;

const ButtonText = styled.Text<{ active: boolean }>`
  ${Theme.typo.Label_03};
  text-align: center;
  color: ${({ active }) => (active ? Theme.colors.White : Theme.colors.Gray400)};
`;
