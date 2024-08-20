import { useState } from "react";
import * as S from "./styles";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import IconButton from "../button/IconButton";
import { Path, Svg } from "react-native-svg";

interface OutSideLabelInputProps {
  label: string;
  placeholder: string;
}

export default function OutSideLabelInput({ label, placeholder }: OutSideLabelInputProps) {
  const [text, setText] = useState("");

  function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setText(e.nativeEvent.text);
  }

  function handleInputClear() {
    setText("");
  }

  return (
    <S.RootContainer>
      <S.StyledLabel>{label}</S.StyledLabel>
      <S.InnerContainer>
        <S.StyledTextInput placeholder={placeholder} value={text} onChange={handleInputChange} />
        {text.length > 0 && (
          <S.ButtonContainer>
            <IconButton
              type="Ball"
              size="Small"
              icon={
                <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <Path
                    d="M14 8L8 14M8 8L14 14M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                    stroke="#C4C4C4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              }
              bgColor="transparent"
              onPress={handleInputClear}
            />
          </S.ButtonContainer>
        )}
      </S.InnerContainer>
    </S.RootContainer>
  );
}
