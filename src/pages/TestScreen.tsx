import React from "react";
import { View } from "react-native";
import KnobIcon from "../assets/images/knob.svg";
import Chip from "../components/common/Chip";

interface TestScreenProps {}

function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "black" }}>
      <Chip
        textColor="#20DC33"
        backGroundColor="#DFF2E1"
        borderRadius="square"
        LeftIcon={<KnobIcon width={16} height={16} />}
        RightIcon={<KnobIcon width={16} height={16} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#20DC33"
        backGroundColor="#DFF2E1"
        borderColor="#74E07E"
        borderRadius="square"
        LeftIcon={<KnobIcon width={16} height={16} />}
        RightIcon={<KnobIcon width={16} height={16} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#20DC33"
        borderRadius="round"
        backGroundColor="#DFF2E1"
        LeftIcon={<KnobIcon width={16} height={16} />}
        RightIcon={<KnobIcon width={16} height={16} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#20DC33"
        borderRadius="round"
        backGroundColor="#DFF2E1"
        borderColor="#74E07E"
        LeftIcon={<KnobIcon width={16} height={16} />}
        RightIcon={<KnobIcon width={16} height={16} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#20DC33"
        borderRadius="circle"
        backGroundColor="#DFF2E1"
        LeftIcon={<KnobIcon width={16} height={16} />}
        RightIcon={<KnobIcon width={16} height={16} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#20DC33"
        borderRadius="circle"
        backGroundColor="#DFF2E1"
        borderColor="#74E07E"
        LeftIcon={<KnobIcon width={16} height={16} />}
        RightIcon={<KnobIcon width={16} height={16} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#327CEA"
        borderRadius="square"
        size="medium"
        backGroundColor="#E6ECF5"
        LeftIcon={<KnobIcon width={20} height={20} />}
        RightIcon={<KnobIcon width={20} height={20} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#327CEA"
        borderRadius="square"
        borderColor="#A7C5F1"
        size="medium"
        backGroundColor="#E6ECF5"
        LeftIcon={<KnobIcon width={20} height={20} />}
        RightIcon={<KnobIcon width={20} height={20} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#327CEA"
        borderRadius="round"
        size="medium"
        backGroundColor="#E6ECF5"
        LeftIcon={<KnobIcon width={20} height={20} />}
        RightIcon={<KnobIcon width={20} height={20} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#327CEA"
        borderRadius="round"
        size="medium"
        backGroundColor="#E6ECF5"
        LeftIcon={<KnobIcon width={20} height={20} />}
        RightIcon={<KnobIcon width={20} height={20} />}
        borderColor="#A7C5F1"
      >
        Chips
      </Chip>
      <Chip
        textColor="#327CEA"
        borderRadius="circle"
        size="medium"
        backGroundColor="#E6ECF5"
        LeftIcon={<KnobIcon width={20} height={20} />}
        RightIcon={<KnobIcon width={20} height={20} />}
      >
        Chips
      </Chip>
      <Chip
        textColor="#327CEA"
        borderRadius="circle"
        size="medium"
        backGroundColor="#E6ECF5"
        borderColor="#A7C5F1"
        LeftIcon={<KnobIcon width={20} height={20} />}
        RightIcon={<KnobIcon width={20} height={20} />}
      >
        Chips
      </Chip>
    </View>
  );
}

export default TestScreen;
