import React, { useCallback, useState } from "react";
import { View, Text, Image, Pressable, ScrollView, FlatList, ImageProps } from "react-native";
import styled from "@emotion/native";
import { Theme } from "@/styles/theme";
import { FavoriteFriend } from "@/apis/favorite-friends/favorite-friends.type";
import { getSubjectType } from "@/utils/SubjectUtil";

interface FavoriteFriendsProps {
  friends: FavoriteFriend[];
  loading: boolean;
  error: Error | null;
  onLoadMore: () => void;
  hasMore: boolean;
  totalCount: number;
  onNavigateToFriendProfile: (userId: number) => void;
}

const FavoriteFriends: React.FC<FavoriteFriendsProps> = ({
  friends,
  loading,
  error,
  onLoadMore,
  hasMore,
  totalCount,
  onNavigateToFriendProfile
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const renderFriendItem = useCallback(
    ({ item, index }: { item: FavoriteFriend; index: number }) => (
      <FriendItem onPress={() => onNavigateToFriendProfile(item.userId)}>
        {item.profileImage ? (
          <AvatarContainer>
            <Avatar source={{ uri: item.profileImage }} />
            <SubjectIcon>
              <Image
                source={getSubjectType(item.activeClassNow || "기타") as ImageProps}
                style={{ width: 16, height: 16 }}
              />
            </SubjectIcon>
          </AvatarContainer>
        ) : (
          <DefaultAvatar color="#9d9d9d">
            <DefaultAvatarText>{item.fullName.slice(-2)}</DefaultAvatarText>
            <SubjectIcon>
              <Image
                source={getSubjectType(item.activeClassNow || "기타") as ImageProps}
                style={{ width: 16, height: 16 }}
              />
            </SubjectIcon>
          </DefaultAvatar>
        )}
      </FriendItem>
    ),
    [onNavigateToFriendProfile]
  );

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      onLoadMore();
      setIsLoadingMore(false);
    }
  }, [loading, hasMore, isLoadingMore, onLoadMore]);

  if (loading && friends.length === 0) return <LoadingText>친구 목록을 불러오는 중...</LoadingText>;
  if (error) return <ErrorText>친구 목록을 불러오는데 실패했습니다.</ErrorText>;
  if (friends.length === 0) return <EmptyText>친한 친구를 추가해보세요!</EmptyText>;

  return (
    <Container>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.userId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (isLoadingMore ? <LoadingText>로딩 중...</LoadingText> : null)}
      />
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  align-items: flex-start;
`;

const FriendItem = styled(Pressable)`
  align-items: center;
  margin-right: 16px;
`;

const AvatarContainer = styled(View)`
  position: relative;
`;

const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const DefaultAvatar = styled(View)<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border-width: 2px;
  border-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
`;

const DefaultAvatarText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${Theme.colors.Gray500};
  font-family: Esamanru OTF;
  font-style: normal;
  line-height: var(--Line-Height-Default-Head-Head-01, 20px); /* 125% */
`;

const SubjectIcon = styled(View)`
  position: absolute;
  right: -4px;
  top: -4px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  border-width: 1px;
  border-color: ${Theme.colors.Gray200};
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled(Text)`
  font-style: ${Theme.typo.Body_04};
  color: ${Theme.colors.Gray600};
`;

const ErrorText = styled(Text)`
  font-style: ${Theme.typo.Body_04};
  color: ${Theme.colors.Primary};
`;

const EmptyText = styled(Text)`
  font-style: ${Theme.typo.Body_04};
  color: ${Theme.colors.Gray600};
`;

const TotalCountText = styled.Text`
  font-style: ${Theme.typo.Body_04};
  color: ${Theme.colors.Gray600};
  margin-bottom: 8px;
`;
export default FavoriteFriends;
