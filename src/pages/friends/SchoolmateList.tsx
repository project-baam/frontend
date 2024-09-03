import styled from "@emotion/native";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Theme } from "../../styles/theme";
import useUserStore from "../../store/UserStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { FriendsStackParamList } from "../../navigations/FriendsStackNavigation";
import { useNavigation } from "@react-navigation/native";
import { DummyProfile } from "../../assets/assets";
type NavigationProps = StackNavigationProp<FriendsStackParamList, "FriendProfile">;

interface Schoolmate {
  userId: number;
  fullName: string;
  profileImage: string;
  grade: number;
  className: string;
  initial: string;
  activeClassNow: string;
  isFavorite: boolean;
}
interface SchoolmateListProps {
  list: Schoolmate[];
  fetchMoreData: () => void;
}
const getRandomColor = (itemIndex: number): string => {
  const colorList = ["#cfbaf0", "#7EB7FB", "#55C4E0", "#51CA81", "#F98888", "#F7D978"];
  const colorIndex = itemIndex % colorList.length;
  return colorList[colorIndex];
};
export default function SchoolmateList({ list, fetchMoreData }: SchoolmateListProps) {
  const navigation = useNavigation<NavigationProps>();
  const renderItem = ({ item }: { item: Schoolmate }) => (
    <FriendItem
      onPress={() =>
        navigation.navigate("FriendProfile", {
          userId: item.userId
        })
      }
    >
      {item.profileImage ? (
        <Avatar source={{ uri: item.profileImage }} />
      ) : (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 25,
            marginRight: 12,
            borderColor: getRandomColor(item.userId),
            borderWidth: 2
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: "30%",
              left: "20%",
              fontSize: 16,
              lineHeight: 20,
              fontWeight: "500",
              fontFamily: "Esamanru OTF",
              color: getRandomColor(item.userId)
            }}
          >
            {item.fullName.slice(-2)}
          </Text>
        </View>
      )}
      <FriendInfo>
        <FriendName>{item.fullName}</FriendName>
        <FriendGrade>{item.grade}학년</FriendGrade>
      </FriendInfo>
    </FriendItem>
  );

  return (
    <>
      <Container>
        {list.length > 0 && (
          <FlatList
            data={list}
            keyExtractor={(item) => item.userId.toString()}
            renderItem={renderItem}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5} // 스크롤이 리스트의 50% 지점에 도달했을 때 fetchMoreData 호출
          />
        )}
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
`;
const FriendInfo = styled(View)`
  margin-left: 12px;
  gap: 4px;
`;

const FriendName = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

const FriendGrade = styled(Text)`
  font-size: 14px;
  color: #666;
`;
const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 25px;
  margin-right: 12px;
`;
const FriendItem = styled(Pressable)`
  padding-vertical: 8px;
  flex-direction: row;
`;
