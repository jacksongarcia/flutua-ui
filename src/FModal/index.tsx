import { useEffect, useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import FButton from "../FButton"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import useModal from "../hooks/modal"

const windowDimensions = Dimensions.get("window")
const screenDimensions = Dimensions.get("screen")

export default function FModal() {
  const { component, showModal } = useModal()
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  })

  const width = useSharedValue(100)
  const height = useSharedValue(100)

  const [body, setBody] = useState(false)

  useEffect(() => {
    if (body) {
      width.value = withTiming(
        dimensions.window.width > 768
          ? 630
          : dimensions.window.width - (45 + 36)
      )
      height.value = withTiming(dimensions.window.width > 768 ? 480 : 284)
    }

    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen })
      }
    )
    return () => subscription?.remove()
  })

  useEffect(() => {
    width.value = withTiming(
      dimensions.window.width > 768 ? 630 : dimensions.window.width - (45 + 36)
    )
    height.value = withTiming(dimensions.window.width > 768 ? 480 : 284)
    const timeoutId = setTimeout(() => {
      setBody(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  const closeModal = () => {
    setBody(false)
    width.value = withTiming(100)
    height.value = withTiming(100)
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
          justifyContent: dimensions.window.width > 768 ? "center" : "flex-end",
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
      <FButton text='CONFIRMAR' onPress={() => closeModal()} />
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
