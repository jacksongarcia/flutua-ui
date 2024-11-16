import { StyleSheet, Text, View } from "react-native"

interface ItemProps {
  key: string
  value: string
}

interface FListProps {
  items: ItemProps[]
}

export default function FList({ items }: FListProps) {
  return (
    <View>
      {items.map((item, key) => (
        <View key={key}>
          <View style={styles.line}>
            <Text style={styles.key}>{item.key}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
          {items[items.length - 1].key != item.key && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 21,
    paddingTop: 21,
  },
  key: {
    color: "#2C698D",
    opacity: 0.5,
    fontWeight: "500",
    fontSize: 16,
  },
  value: {
    color: "#2C698D",
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#f8f8fc",
  },
})
