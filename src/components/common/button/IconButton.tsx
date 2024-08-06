import { ReactNode } from "react";
import * as S from "./styles";

interface IconButtonProps {
  type: "Rec" | "Ball";
  size: "Small" | "Medium" | "Large" | "Oasis";
  icon: ReactNode;
}

export default function IconButton({ type, size, icon }: IconButtonProps) {
  let number;
  let padding;
  switch (size) {
    case "Small":
      number = 28;
      padding = 4;
      break;
    case "Medium":
      number = 40;
      padding = 8;
      break;
    case "Large":
      number = 56;
      padding = 12;
      break;
    case "Oasis":
      number = 72;
      padding = 16;
      break;
  }

  return (
    <S.StyledView type={type} number={number} padding={padding}>
      <S.InnerView>{icon}</S.InnerView>
    </S.StyledView>
  );
}
