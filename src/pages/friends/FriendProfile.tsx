import React, { useState } from "react";
import styled from "@emotion/native";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { VectorLeft } from "../../assets/assets";
import { Star01 } from "../../assets/assets";
import { Star02 } from "../../assets/assets";

// Sample data
const timetable = [
  {
    subjectName: "국어1",
    startTime: "9:00",
    endTime: "9:45",
    time: 1,
    icon: "https://picsum.photos/400/400"
  },
  {
    subjectName: "수학1",
    startTime: "10:00",
    endTime: "10:45",
    time: 2,
    icon: "https://picsum.photos/400/400"
  },
  {
    subjectName: "과학1",
    startTime: "11:00",
    endTime: "11:45",
    time: 3,
    icon: "https://picsum.photos/400/400"
  },
  {
    subjectName: "영어1",
    startTime: "13:00",
    endTime: "13:45",
    time: 4,
    icon: "https://picsum.photos/400/400"
  }
];

function FriendProfile({ navigation, route }: any) {
  const [selectedTab, setSelectedTab] = useState("today");

  const TodayTimetable = () => {
    return (
      <ScrollView>
        {timetable.map((it, idx) => (
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
            <Image source={{ uri: it.icon }} style={{ width: 40, height: 40 }} />
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
                {it.subjectName}
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
                {it.startTime} ~{it.endTime} ({it.time}교시)
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };
  const TotalTimetable = () => {
    return (
      <ScrollView>
        <Text>전체 시간표</Text>
      </ScrollView>
    );
  };

  return (
    <Container>
      <ContentContainer>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <BackIcon source={VectorLeft} />
          </BackButton>
          {/* 별 누를 시 즐겨찾기 추가 */}
          {route.params.favorite ? <Image source={Star02} /> : <Image source={Star01} />}
        </Header>
        <View>
          <ImageBackground
            source={{ uri: "https://picsum.photos/400/400" }}
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
            <Image
              source={{ uri: "https://picsum.photos/400/400" }}
              style={{ height: 80, width: 80, borderRadius: 1000 }}
            />
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
              명지대학교
            </Text>
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
              3학년 2반
            </Text>
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
