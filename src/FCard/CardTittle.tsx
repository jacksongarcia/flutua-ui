import { StyleSheet, Text, View } from "react-native"

interface CardTitlePros {
  text: string
  position?: "left" | "center" | "right"
}

export default function CardTitle({
  text,
  position = "center",
}: CardTitlePros) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { textAlign: position }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  text: {
    color: "#2C698D",
    fontSize: 21,
    fontWeight: "700",
  },
})
