import { View, Text, SafeAreaView } from "react-native";
import TimeTable from "../../components/home/TimeTable";

const AddTimeTableScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TimeTable />
    </SafeAreaView>
  );
};

export default AddTimeTableScreen;
