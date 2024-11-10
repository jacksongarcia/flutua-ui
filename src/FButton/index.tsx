// import { WIDTH_COMPONENT_WEB } from "@/constants/screen"
// import useScreen from "@/hooks/screen"
import { useEffect, useState } from "react"
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import useScreen from "../hooks/screen"
import { WIDTH_COMPONENT_WEB } from "../constants/screen"

interface FButtonProps {
  text: string
  disabled?: boolean
  size?: "small" | "big"
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

export default function FButton({
  text,
  disabled = false,
  size = "big",
  onPress,
}: FButtonProps) {
  const { dimensions, isDesktop } = useScreen()

  const width = useSharedValue(0)

  const [body, setBody] = useState(false)

  useEffect(() => {
    if (body) {
      width.value = withTiming(
        isDesktop() ? WIDTH_COMPONENT_WEB : dimensions.window.width - (45 + 36)
      )
    }
  })

  useEffect(() => {
    width.value = withTiming(
      isDesktop() ? WIDTH_COMPONENT_WEB : dimensions.window.width - (45 + 36)
    )
    const timeoutId = setTimeout(() => {
      setBody(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Animated.View
      style={[
        styles.button,
        disabled && styles.disabled,
        size == "small" && styles.small,
        {
          width: width,
          height: 45,
        },
      ]}
    >
      {body && (
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={disabled}
          onPress={onPress}
          style={[styles.button, { width: "100%", height: "100%" }]}
        >
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: "#17B6E0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 0.3,
    cursor: "pointer",
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
