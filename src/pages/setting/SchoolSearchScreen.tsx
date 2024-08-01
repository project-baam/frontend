import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { SettingStackParamList } from "../../navigations/SettingStackNavigation";
import { Theme } from "../../styles/theme";

interface School {
  name: string;
  address: string;
}

const schools: School[] = [
  { name: "명지대학교", address: "서울특별시 서대문구 홍제동" },
  { name: "서울대학교", address: "서울특별시 관악구 관악로" },
  { name: "고려대학교", address: "서울특별시 성북구 안암로" },
  { name: "연세대학교", address: "서울특별시 서대문구 연세로" }
];

function SchoolSearchScreen() {
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>(schools);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredSchools(schools);
    } else {
      setFilteredSchools(schools.filter((school) => school.name.toLowerCase().includes(query.toLowerCase())));
    }
  };

  const handleSchoolSelect = (school: string) => {
    navigation.navigate("ProfileEditScreen", { school });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => handleSchoolSelect(searchQuery)}>
          <Text>선택</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, searchQuery]);

  return (
    <SafeAreaView style={{ backgroundColor: Theme.colors.White, flex: 1 }}>
      <Container>
        <SearchContainer>
          <SearchInput placeholder="검색" value={searchQuery} onChangeText={handleSearchChange} />
        </SearchContainer>
        <FlatList
          data={filteredSchools}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSchoolSelect(item.name)}>
              <SchoolContainer>
                <SchoolName>{item.name}</SchoolName>
                <SchoolAddress>{item.address}</SchoolAddress>
              </SchoolContainer>
            </TouchableOpacity>
          )}
        />
      </Container>
    </SafeAreaView>
  );
}

export default SchoolSearchScreen;

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const SearchContainer = styled.View`
  background-color: ${Theme.colors.Gray200};
  border-radius: 12px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
  margin-bottom: 16px;
`;

const SearchInput = styled.TextInput`
  height: 100%;
  flex: 1;
  font-size: 16px;
`;

const SchoolContainer = styled.View`
  padding: 16px;
  background-color: ${Theme.colors.Gray200};
  gap: 8px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const SchoolName = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${Theme.colors.Gray600};
`;

const SchoolAddress = styled.Text`
  font-size: 16px;
  color: ${Theme.colors.Gray600};
`;
