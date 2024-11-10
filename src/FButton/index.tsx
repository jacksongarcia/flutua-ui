import { useEffect, useState } from "react"
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from "react-native"

interface FButtonProps {
  text: string
  disabled?: boolean
  size?: "small" | "big"
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}
const windowDimensions = Dimensions.get("window")
const screenDimensions = Dimensions.get("screen")

export default function FButton({
  text,
  disabled = false,
  size = "big",
  onPress,
}: FButtonProps) {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  })

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen })
      }
    )
    return () => subscription?.remove()
  })

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        size == "small" && styles.small,
        {
          width:
            dimensions.window.width > 768
              ? 330
              : dimensions.window.width - (45 + 36),
        },
      ]}
      activeOpacity={0.5}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 25,
    backgroundColor: "#17B6E0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 0.3,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 3.2,
    fontStyle: "normal",
  },
  disabled: {
    backgroundColor: "#CDCDD3",
  },
  small: {
    width: 159,
  },
})
