import { IconBell } from "@/assets/assets";
import styled from "@emotion/native";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, SafeAreaView } from "react-native";

interface InAppNotificationProps {
  title: string;
  message: string;
  onPress: () => void;
  onHide: () => void;
  duration?: number;
}

const InAppNotification: React.FC<InAppNotificationProps> = ({ title, message, onPress, onHide, duration = 3000 }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.delay(duration),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      onHide();
    });
  }, [translateY, duration, onHide]);

  return (
    <SafeAreaContainer>
      <AnimatedContainer style={{ transform: [{ translateY }] }}>
        <TouchableOpacity onPress={onPress}>
          <Content>
            <IconContainer>
              <NotificationIconImage source={IconBell} />
            </IconContainer>
            <TextContainer>
              <Title numberOfLines={1}>{title}</Title>
              <Message numberOfLines={2}>{message}</Message>
            </TextContainer>
          </Content>
        </TouchableOpacity>
      </AnimatedContainer>
    </SafeAreaContainer>
  );
};

const SafeAreaContainer = styled(SafeAreaView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const AnimatedContainer = styled(Animated.View)`
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #e9e9e9;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 3;
`;

const Content = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-right: 12px;
`;

const NotificationIconImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: #434343;
  font-size: 17px;
  font-family: "Pretendard";
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 2px;
`;

const Message = styled.Text`
  color: #7b7b7b;
  font-size: 14px;
  font-family: "Pretendard";
  font-weight: 500;
  line-height: 16px;
`;

export default InAppNotification;
