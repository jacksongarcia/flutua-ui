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
import { FCard } from "../FCard"

interface FModalProps {
  textButton: string
  eventButton?: Function
}

export default function FModal({ textButton, eventButton }: FModalProps) {
  const { show, showModal } = useModal()
  const { dimensions, isDesktop } = useScreen()

  const width = useSharedValue(0)
  const height = useSharedValue(0)

  const [body, setBody] = useState(false)
  const [showCard, setShowCard] = useState(false)

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
    setShowCard(true)
    if (eventButton) eventButton()
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
      <FCard.context
        width={
          isDesktop()
            ? WIDTH_COMPONENT_WEB
            : dimensions.window.width - (36 + 45)
        }
        toClose={showCard}
        closedCard={() => showModal(false)}
      >
        <FCard.title text='MODAL' />
      </FCard.context>
      <View style={{ height: 32 }} />
      {body && <FButton text={textButton} onPress={() => closeModal()} />}
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
    backgroundColor: "#2c698de6",
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
    alignItems: "center",
    paddingBottom: 41,
  },
})
