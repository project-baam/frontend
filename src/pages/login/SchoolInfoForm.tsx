import styled from "@emotion/native";
import { Theme } from "../../styles/theme";
import { StackScreenProps } from "@react-navigation/stack";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "react-native";

type SchoolInfoFormProps = StackScreenProps<SignUpStackParamList, "SchoolInfoForm">;

type item = {
  grade: number;
  name: string[];
};

export default function SchoolInfoForm({ navigation, route }: SchoolInfoFormProps) {
  const params = route.params;
  const id = params.schoolInfo.id;
  const name = params.schoolInfo.name;
  const roadNameAddress = params.schoolInfo.roadNameAddress;

  // 학년
  const [openGrade, setOpenGrade] = useState(false);
  const [grade, setGrade] = useState(null);
  const [gradeItems, setGradeItems] = useState<ItemType<string>[]>([]);

  // 학반
  const [classItems, setClassItems] = useState("");

  // 학교별 학급 정보 조회 API
  useEffect(() => {
    async function fetchSchool() {
      const response = await axios.get(`https://b-site.site/school-dataset/classes/${id}`, {
        headers: {
          Accept: "application/json"
        }
      });

      const items = response.data.list;
      const grades = items.map((item: item) => {
        return {
          label: String(item.grade),
          value: String(item.grade)
        };
      });
      setGradeItems(grades);
    }
    fetchSchool();
  }, [id]);

  return (
    <RootContainer>
      <InnerContainer>
        <StyledLabel>고등학교</StyledLabel>
        <Card>
          <SchoolName>{name}</SchoolName>
          <Address>{roadNameAddress}</Address>
        </Card>
      </InnerContainer>
      <InnerContainer>
        <StyledLabel>학년 반</StyledLabel>
        <DropDownRootContainer>
          <DropdownContainer>
            <DropDownPicker
              value={grade}
              open={openGrade}
              setOpen={setOpenGrade}
              setValue={setGrade}
              items={gradeItems}
              setItems={setGradeItems}
              placeholder="선택 필요"
              style={pickerStyle}
              closeAfterSelecting={true}
              dropDownContainerStyle={dropDownContainerStyle}
            />
          </DropdownContainer>
          <DropdownContainer>
            <DropDownPicker
              value={grade}
              open={openGrade}
              setOpen={setOpenGrade}
              setValue={setGrade}
              items={gradeItems}
              setItems={setGradeItems}
              placeholder="선택 필요"
              style={pickerStyle}
              closeAfterSelecting={true}
              dropDownContainerStyle={dropDownContainerStyle}
            />
          </DropdownContainer>
        </DropDownRootContainer>
      </InnerContainer>
    </RootContainer>
  );
}

const pickerStyle = {
  backgroundColor: Theme.colors.Gray100,
  borderColor: Theme.colors.Gray100,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 12,
  width: 156,
  height: 42
};

const dropDownContainerStyle = {
  borderColor: Theme.colors.Gray200,
  backgroundColor: Theme.colors.Gray200,
  width: 156
};

const DropDownRootContainer = styled.View`
  flex-direction: row;
`;

const DropdownContainer = styled.View`
  flex: 1;
`;

const RootContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${Theme.colors.White};
`;

const InnerContainer = styled.View`
  background-color: ${Theme.colors.White};
  margin-top: 27px;
  margin-horizontal: 16px;
  gap: 16px;
`;

const StyledLabel = styled.Text`
  ${Theme.typo.Label_02};
  color: ${Theme.colors.Black};
`;

const Card = styled.View`
  width: 100%;
  background-color: #f3f2ff;
  padding: 16px 12px 16px 12px;
  border-radius: 12px;
  gap: 8px;
  justify-content: center;
`;
const SchoolName = styled.Text`
  ${Theme.typo.Body_04_Bold};
  color: ${Theme.colors.Gray900};
`;

const Address = styled.Text`
  ${Theme.typo.Body_03_Regular};
  color: ${Theme.colors.Gray900};
`;
