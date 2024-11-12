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
          <Text>{item.key}</Text>
          <Text>{item.value}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({})
