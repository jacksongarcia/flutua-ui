// import { WIDTH_SCREEN_MOBILE } from "@/constants/screen"
import { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { WIDTH_SCREEN_MOBILE } from "../constants/screen"

const windowDimensions = Dimensions.get("window")
const screenDimensions = Dimensions.get("screen")

export default function useScreen() {
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

  const isDesktop = () => dimensions.window.width > WIDTH_SCREEN_MOBILE

  return { dimensions, isDesktop }
}
