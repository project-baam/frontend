import React, { useCallback } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface ItemProps {
  item: any;
  isFirst: boolean;
  isLast: boolean;
}

const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

const AgendaItem = (props: ItemProps) => {
  const { item, isFirst, isLast } = props;

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, [item.title]);

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
  };

  if (isEmpty(item)) {
    return <></>;
  }

  return (
    <Pressable
      onPress={itemPressed}
      style={[
        styles.item,
        isToday(item.date) && styles.itemToday,
        isFirst && styles.firstItem,
        isLast && styles.lastItem
      ]}
    >
      <View style={[styles.itemDateContainer, { borderRightColor: item.color || "green" }]}>
        <Text style={styles.itemDateText}>{item.date.split("-")[2]}</Text>
        <Text style={styles.itemDayOfWeekText}>{item.dayOfWeek}</Text>
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <Text style={styles.itemHourText}>{item.hour}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    gap: 16
  },
  itemToday: {
    backgroundColor: "#F5F5F5"
  },
  itemDateContainer: {
    borderRightWidth: 2,
    borderRightColor: "green",
    paddingRight: 20,
    alignItems: "center",
    gap: 2
  },
  itemDateText: {
    fontSize: 24,
    fontWeight: "600"
  },
  itemDayOfWeekText: {
    fontSize: 14,
    fontWeight: "500",
    color: "grey"
  },
  itemHourText: {
    color: "grey"
  },
  itemTitleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16
  },
  itemTextContainer: {
    gap: 8
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14
  },
  firstItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  lastItem: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  }
});

export default AgendaItem;
