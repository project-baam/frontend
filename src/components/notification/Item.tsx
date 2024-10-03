import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { NotificationCategory } from "@/apis/notification/notification.enums";

interface NotificationItemProps {
  category: NotificationCategory;
  title: string;
  description?: string | null;
  isRead: boolean;
  onPress: () => void;
  onAccept?: () => void; // 친구 요청 수락
  onReject?: () => void; // 친구 요청 거절
  onCancel?: () => void; // 친구 요청 취소
  requestType?: "sent" | "received";
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  category,
  title,
  description,
  isRead,
  onPress,
  onAccept,
  onReject,
  onCancel,
  requestType
}) => {
  return (
    <Container isRead={isRead} onPress={onPress}>
      <Category>{category}</Category>
      <ContentContainer>
        <Indicator />
        <TextContainer>
          <Title>{title}</Title>
          {description ? (
            <Description>{description}</Description>
          ) : category === NotificationCategory.FriendRequest ? (
            <ButtonContainer>
              {requestType === "received" ? (
                <>
                  <AcceptButton onPress={onAccept}>
                    <AcceptButtonText>수락하기</AcceptButtonText>
                  </AcceptButton>
                  <RejectButton onPress={onReject}>
                    <RejectButtonText>거절하기</RejectButtonText>
                  </RejectButton>
                </>
              ) : (
                <CancelButton onPress={onCancel}>
                  <CancelButtonText>취소하기</CancelButtonText>
                </CancelButton>
              )}
            </ButtonContainer>
          ) : null}
        </TextContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View<{ isRead: boolean }>`
  width: 100%;
  padding: 10px 16px;
  background-color: ${(props) => (props.isRead ? "#F5F5F5" : "white")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const Category = styled.Text`
  color: #434343;
  font-size: 14px;
  font-family: "Pretendard";
  font-weight: 400;
  line-height: 16px;
`;

const ContentContainer = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const Indicator = styled.View`
  width: 4px;
  height: 44px;
  background-color: #555555;
  border-radius: 20px;
`;

const TextContainer = styled.View`
  flex: 1;
  padding: 0 8px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const Title = styled.Text`
  align-self: stretch;
  color: #555555;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 600;
  line-height: 22px;
`;

const Description = styled.Text`
  align-self: stretch;
  color: #9d9d9d;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 500;
  line-height: 22px;
`;

const AcceptButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

const AcceptButtonText = styled.Text`
  color: #8a7eff;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 500;
  line-height: 22px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const RejectButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

const RejectButtonText = styled.Text`
  color: #9d9d9d;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 500;
  line-height: 22px;
`;

const CancelButton = styled(TouchableOpacity)`
  align-self: flex-start;
`;

const CancelButtonText = styled.Text`
  color: #9d9d9d;
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: 500;
  line-height: 22px;
`;

export default NotificationItem;
