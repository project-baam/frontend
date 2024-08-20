import styled from "@emotion/native";
import { Theme } from "../../../styles/theme";

export const RootContainer = styled.View`
  width: 328px;
  height: 80px;
  gap: 16px;
`;

export const InnerContainer = styled.View`
  flex-direction: row;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  left: 285px;
  top: 10px;
`;

export const StyledLabel = styled.Text`
  color: ${Theme.colors.Gray900};
  ${Theme.typo.Label_01};
`;

export const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 48px;
  background-color: ${Theme.colors.Gray100};
  padding: 12px 16px;
  color: ${Theme.colors.Gray900};
  border-radius: 12px;
  ${Theme.typo.Body_03_Regular};
`;

export const IRootContainer = styled.View`
  width: 328px;
  height: 56px;
  background-color: ${Theme.colors.Gray100};
  padding: 8px 16px 8px 16px;
  border-radius: 12px;
`;

export const IInnerContainer = styled.View`
  flex-direction: row;
`;

export const IStyledLabel = styled.Text`
  ${Theme.typo.Caption_01};
  color: ${Theme.colors.Gray500};
`;

export const IStyledTextInput = styled.TextInput`
  ${Theme.typo.Body_03_Regular};
  color: ${Theme.colors.Gray900};
`;

export const IButtonContainer = styled.View`
  position: absolute;
  left: 275px;
`;
