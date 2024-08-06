import styled from "@emotion/native";
import { Theme } from "../../../styles/theme";

export const StyledView = styled.View<{ type: "Rec" | "Ball"; number: number; padding: number }>`
  width: ${({ number }) => `${number}px`};
  height: ${({ number }) => `${number}px`};
  border-radius: ${({ type }) => (type === "Rec" ? "0" : "3000px")};
  background-color: ${Theme.colors.Gray900};
  padding: ${({ padding }) => `${padding}px`};
  justify-content: center;
  align-items: center;
`;

export const InnerView = styled.View`
  width: 100%;
  height: 100%;
`;
