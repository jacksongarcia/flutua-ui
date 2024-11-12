// import { WIDTH_COMPONENT_WEB } from "@/constants/screen"
// import useScreen from "@/hooks/screen"
import { ReactNode, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import useScreen from "../hooks/screen"
import { WIDTH_COMPONENT_WEB } from "../constants/screen"

interface CardContext {
  children?: ReactNode
  width?: number
  height?: number
  color?: string
  toClose?: boolean
  closedCard?: Function
}

export default function CardContext({
  children,
  width,
  height,
  color,
  toClose,
  closedCard,
}: CardContext) {
  const widthAnime = useSharedValue(1)
  const heightAnime = useSharedValue(1)
  const { dimensions, isDesktop } = useScreen()
  const [body, setBody] = useState(false)

  useEffect(() => {
    widthAnime.value = withTiming(
      width
        ? width
        : isDesktop()
        ? WIDTH_COMPONENT_WEB
        : dimensions.window.width - 24
    )
    heightAnime.value = withTiming(height ? height : 130)
    const timeoutId = setTimeout(() => {
      setBody(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!toClose) return
    setBody(false)

    widthAnime.value = withTiming(0)
    heightAnime.value = withTiming(0)
    const timeoutId = setTimeout(() => {
      if (closedCard) closedCard()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [toClose])

  return (
    <View
      style={{
        display: "flex",
        height: height ? height : 130,
        width: width
          ? width
          : isDesktop()
          ? WIDTH_COMPONENT_WEB
          : dimensions.window.width - 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: widthAnime,
            height: heightAnime,
            backgroundColor: color ? color : "white",
          },
        ]}
      >
        {body && children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    elevation: 0.3,
    display: "flex",
    paddingTop: 27,
    paddingBottom: 27,
    paddingLeft: 24,
    paddingRight: 24,
  },
})
