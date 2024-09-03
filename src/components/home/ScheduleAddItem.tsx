import { useState } from "react";
import styled from "@emotion/native";

interface ScheduleAddItemProps {
  title: string;
}

const ScheduleAddItem = ({ title }: ScheduleAddItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 58px;
  justify-content: center;
  padding: 0 16px;
  border: 2px solid #f5f5f5;
  gap: 20px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

export default ScheduleAddItem;
