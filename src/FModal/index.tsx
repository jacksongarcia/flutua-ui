import { useEffect, useState } from "react"
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native"
import FButton from "../FButton"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import useModal from "../hooks/modal"
import useScreen from "../hooks/screen"
import { WIDTH_COMPONENT_WEB } from "../constants/screen"

// import useModal from "@/hooks/modal"
// import useScreen from "@/hooks/screen"
// import { WIDTH_COMPONENT_WEB } from "@/constants/screen"

export default function FModal() {
  const { component, showModal } = useModal()
  const { dimensions, isDesktop } = useScreen()

  const width = useSharedValue(0)
  const height = useSharedValue(0)

  const [body, setBody] = useState(false)

  useEffect(() => {
    if (body) {
      width.value = withTiming(
        isDesktop()
          ? WIDTH_COMPONENT_WEB + 200
          : dimensions.window.width - (45 + 36)
      )
      height.value = withTiming(isDesktop() ? 480 : 284)
    }
  })

  useEffect(() => {
    width.value = withTiming(
      isDesktop()
        ? WIDTH_COMPONENT_WEB + 200
        : dimensions.window.width - (45 + 36)
    )
    height.value = withTiming(isDesktop() ? 480 : 284)
    const timeoutId = setTimeout(() => {
      setBody(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  const closeModal = () => {
    setBody(false)
    width.value = withTiming(0)
    height.value = withTiming(0)
    const timeoutId = setTimeout(() => {
      showModal(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions.window.width,
          height: dimensions.window.height,
          justifyContent: isDesktop() ? "center" : "flex-end",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.box,
          {
            width,
            height,
          },
        ]}
      >
        {body && component}
      </Animated.View>
      {body && <FButton text='CONFIRMAR' onPress={() => closeModal()} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: 99999999,
    backgroundColor: "#2C698D80",
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
    alignItems: "center",
    paddingBottom: 141,
  },
  box: {
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    elevation: 0.3,
    backgroundColor: "white",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    padding: 32,
  },
})
