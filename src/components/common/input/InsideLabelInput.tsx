import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import * as S from "./styles";
import { useState } from "react";
import IconButton from "../button/IconButton";
import { Path, Svg } from "react-native-svg";

interface InsideLabelInputProps {
  label: string;
  placeholder: string;
}

export default function InsideLabelInput({ label, placeholder }: InsideLabelInputProps) {
  const [text, setText] = useState("");

  function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setText(e.nativeEvent.text);
  }

  function handleInputClear() {
    setText("");
  }

  return (
    <S.IRootContainer>
      <S.IStyledLabel>{label}</S.IStyledLabel>
      <S.IInnerContainer>
        <S.IStyledTextInput placeholder={placeholder} value={text} onChange={handleInputChange} />
        {text.length > 0 && (
          <S.IButtonContainer>
            <IconButton
              type="Ball"
              size="Small"
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M12.5 7.49999L7.49999 12.5M7.49999 7.49999L12.5 12.5M18.3333 9.99999C18.3333 14.6024 14.6024 18.3333 9.99999 18.3333C5.39762 18.3333 1.66666 14.6024 1.66666 9.99999C1.66666 5.39762 5.39762 1.66666 9.99999 1.66666C14.6024 1.66666 18.3333 5.39762 18.3333 9.99999Z"
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
          </S.IButtonContainer>
        )}
      </S.IInnerContainer>
    </S.IRootContainer>
  );
}
