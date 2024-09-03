import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigations/HomeStackNavigation";
import { Theme } from "../../styles/theme";
import styled from "@emotion/native";
import DateCarousel from "../../components/home/DateCarousel";

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <DateCarousel />
        <Section>
          <SectionHeader>
            <SectionHeaderTitle>시간표</SectionHeaderTitle>
            <Pressable>
              <CustomImage
                source={require("../../assets/images/btn_left.png")}
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </Pressable>
          </SectionHeader>
          <EmptyTimeTableBox>
            <EmptyTimeTableBoxLabel>아직 시간표가 없어요!</EmptyTimeTableBoxLabel>
            <AddTimeTableButton onPress={() => navigation.navigate("AddTimeTableScreen")}>
              <AddTimeTableButtonText>시간표 추가하기</AddTimeTableButtonText>
              <Pressable>
                <CustomImage source={require("../../assets/images/chevron-right.png")} />
              </Pressable>
            </AddTimeTableButton>
          </EmptyTimeTableBox>
        </Section>

        <Section>
          <SectionHeader>
            <SectionHeaderTitle>친한 친구들</SectionHeaderTitle>
            <Pressable>
              <CustomImage
                source={require("../../assets/images/btn_left.png")}
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </Pressable>
          </SectionHeader>
          <FriendList>
            <Avatar>
              <AvatarText>김</AvatarText>
            </Avatar>
            <Avatar>
              <AvatarText>이</AvatarText>
            </Avatar>
            <Avatar>
              <AvatarText>박</AvatarText>
            </Avatar>
            <Avatar>
              <AvatarText>최</AvatarText>
            </Avatar>
            <Avatar>
              <AvatarText>최</AvatarText>
            </Avatar>
            <Avatar>
              <AvatarText>최</AvatarText>
            </Avatar>
            <Avatar>
              <AvatarText>최</AvatarText>
            </Avatar>
          </FriendList>
          {/* <EmptyFriendsLabel>친한 친구들을 추가해보세요!</EmptyFriendsLabel> */}
        </Section>

        <Section>
          <SectionHeader>
            <SectionHeaderTitle>오늘의 급식</SectionHeaderTitle>
            <Pressable>
              <CustomImage
                source={require("../../assets/images/btn_left.png")}
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </Pressable>
          </SectionHeader>
        </Section>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  gap: 20px;
`;

const Section = styled(View)`
  width: 100%;
  gap: 10px;
  padding: 0 20px;
  align-items: center;
`;

const SectionHeader = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SectionHeaderTitle = styled(Text)`
  font-style: ${Theme.typo.Body_04};
`;

const EmptyTimeTableBox = styled(View)`
  width: 100%;
  height: 270px;
  background-color: #f3f2ff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const EmptyTimeTableBoxLabel = styled(Text)`
  font-style: ${Theme.typo.Body_04_Bold};
`;

const AddTimeTableButton = styled(Pressable)`
  width: 170px;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.Violet};
  border-radius: 100px;
`;

const AddTimeTableButtonText = styled(Text)`
  font-style: ${Theme.typo.Body_04_Bold};
  color: #fff;
`;

const EmptyFriendsLabel = styled(Text)`
  font-style: ${Theme.typo.Label_02};
  color: ${Theme.colors.Gray600};
  padding: 20px 0;
`;

const CustomImage = styled(Image)`
  width: 32px;
  height: 32px;
`;

const FriendList = styled(View)`
  width: 100%;
  flex-direction: row;
  gap: 10px;
  padding-bottom: 20px;
`;

const Avatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid ${Theme.colors.Gray200};
  justify-content: center;
  align-items: center;
`;

const AvatarText = styled.Text`
  font-style: ${Theme.typo.Body_04_Bold};
  color: ${Theme.colors.Gray700};
`;

export default HomeScreen;
