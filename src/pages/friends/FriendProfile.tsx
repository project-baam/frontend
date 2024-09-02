import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { VectorLeft } from "../../assets/assets";
import { Star01, Star02, Hamburger } from "../../assets/assets";
import axios from "axios";
import useUserStore from "../../store/UserStore";

// Sample data
const timetable = [
  {
    day: 1,
    period: 1,
    subject: "국어",
    subjectShort: "국어"
  },
  {
    day: 1,
    period: 2,
    subject: "수학",
    subjectShort: "수학"
  },
  {
    day: 1,
    period: 3,
    subject: "영어",
    subjectShort: "영어"
  }
];
const fp = {
  isClassPublic: true,
  className: "2",
  isTimetablePublic: true,
  allTimetable: [],
  todayTimetable: [],
  profileImage: "https://sgp1.digitaloceanspaces.com/baam/development/user-profiles/5",
  profileBackgroundImage: "https://sgp1.digitaloceanspaces.com/baam/development/user-backgrounds/5",
  schoolName: "가락고등학교",
  grade: 2
};
//
function FriendProfile({ navigation, route }: any) {
  const [selectedTab, setSelectedTab] = useState("today");
  const [profile, setProfile] = useState(fp);
  const [isFriend, setIsFriend] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [timeTable, setTimeTable] = useState(timetable);
  const { accessToken } = useUserStore((state) => state);
  const getIsSent = async () => {
    try {
      const response = await axios.get(`https://b-site.site/friend-requests/sent?count=10&page=0`, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것을 명시
          Authorization: `Bearer ${accessToken}` // 필요시, Authorization 헤더에 토큰 포함
        }
      });
      setIsSent(response.data.list.find((item: any) => item.userId === route.params.userId));
      console.log("success2");
    } catch (error: any) {
      console.error(error.response ? error.response.data : error.message); // 오류 처리
    }
  };
  const getFriendDetail = async () => {
    try {
      const response = await axios.get(`https://b-site.site/friends/detail/${route.params.userId}`, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 데이터를 보낼 것을 명시
          Authorization: `Bearer ${accessToken}` // 필요시, Authorization 헤더에 토큰 포함
        }
      });
      setProfile(response.data);
      setTimeTable(response.data.todayTimetable);
    } catch (error: any) {
      console.error(error.response ? error.response.data : error.message); // 오류 처리
    } finally {
      getIsSent();
    }
  };

  useEffect(() => {
    getFriendDetail();
    setIsFriend(route.params.isFriend);
  }, []);

  const TodayTimetable = () => {
    return (
      <>
        {profile.isTimetablePublic ? (
          <ScrollView>
            {timeTable.map((it, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "rgba(207, 186, 240, 0.1)",
                  borderRadius: 12,
                  marginHorizontal: 16,
                  marginBottom: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 18,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={{ width: 40, height: 40 }} />
                <View style={{ marginLeft: 20, gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      fontFamily: "Pretendard",
                      color: "#434343",
                      textAlign: "left"
                    }}
                  >
                    {it.subject}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "Pretendard",
                      color: "#7b7b7b",
                      textAlign: "left"
                    }}
                  >
                    ({it.period}교시)
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>시간표 비공개 회원입니다.</Text>
          </View>
        )}
      </>
    );
  };
  const TotalTimetable = () => {
    return (
      <>
        {profile.isTimetablePublic ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>시간표 공개 회원입니다.</Text>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>시간표 비공개 회원입니다.</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <Container>
      <ContentContainer>
        {isFriend ? (
          <Header>
            <BackButton onPress={() => navigation.goBack()}>
              <BackIcon source={VectorLeft} />
            </BackButton>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {route.params.isFavorite ? <Image source={Star02} /> : <Image source={Star01} />}
              <Image source={Hamburger} style={{ width: 24, height: 24 }} />
            </View>
          </Header>
        ) : (
          <Header>
            <BackButton onPress={() => navigation.goBack()}>
              <BackIcon source={VectorLeft} />
            </BackButton>
          </Header>
        )}

        <View>
          <ImageBackground
            source={{ uri: profile.profileBackgroundImage }}
            imageStyle={{ borderRadius: 16, height: 220, marginHorizontal: 16, marginTop: 8, marginBottom: 20 }}
            style={{}}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 230
            }}
          >
            <Image source={{ uri: profile.profileImage }} style={{ height: 80, width: 80, borderRadius: 1000 }} />
            <Text
              style={{
                position: "absolute",
                left: 35,
                top: 160,
                fontSize: 16,
                lineHeight: 20,
                fontWeight: "500",
                fontFamily: "Esamanru OTF",
                color: "#fff",
                textAlign: "left"
              }}
            >
              {profile.schoolName}
            </Text>
            {isFriend && profile.isClassPublic ? (
              <Text
                style={{
                  position: "absolute",
                  left: 35,
                  top: 184,
                  fontSize: 16,
                  lineHeight: 20,
                  fontWeight: "500",
                  fontFamily: "Esamanru OTF",
                  color: "#fff",
                  textAlign: "left"
                }}
              >
                {profile.grade}학년 {profile.className}반
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
        <Tabs>
          <TabButton active={selectedTab === "today"} onPress={() => setSelectedTab("today")}>
            <TabText active={selectedTab === "today"}>오늘 시간표</TabText>
          </TabButton>
          <TabButton active={selectedTab === "total"} onPress={() => setSelectedTab("total")}>
            <TabText active={selectedTab === "total"}>전체 시간표</TabText>
          </TabButton>
        </Tabs>
        <View style={{ flex: 1 }}>{selectedTab === "today" ? <TodayTimetable /> : <TotalTimetable />}</View>
        {isFriend ? (
          <></>
        ) : (
          <>
            {isSent ? (
              <SubmitButton backgroundColor="#555555" onPress={() => {}}>
                <SubmitButtonText>친구 요청 취소하기</SubmitButtonText>
              </SubmitButton>
            ) : (
              <SubmitButton backgroundColor="#8A7EFF" onPress={() => {}}>
                <SubmitButtonText>친구 요청하기</SubmitButtonText>
              </SubmitButton>
            )}
          </>
        )}
      </ContentContainer>
    </Container>
  );
}

export default FriendProfile;
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  flex: 1;
`;
const Tabs = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  align-self: stretch;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.active ? "#262626" : "#D9D9D9")};
  align-items: center;
  width: 50%;
`;

const TabText = styled.Text<{ active: boolean }>`
  text-align: "left";
  color: ${(props) => (props.active ? "#262626" : "#7B7B7B")};
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  font-family: Pretendard;
  padding-vertical: 10px;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;

const BackButton = styled(TouchableOpacity)`
  padding: 10px;
`;

const BackIcon = styled(Image)`
  width: 8.5px;
  height: 15px;
`;
const SubmitButton = styled(TouchableOpacity)<{ backgroundColor: string }>`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 34px;
  border-radius: 24px;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "#8A7EFF")};
  justify-content: center;
  padding-horizontal: 24px;
  padding-vertical: 16px;
`;

const SubmitButtonText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  font-family: Pretendard;
  color: #fff;
  text-align: center;
`;
