import { Dimensions } from "react-native"

export const isMobile = () =>
  Dimensions.get("screen").width < 768


export const isDesktop = () => {
  return Dimensions.get("screen").width > 768
}

export const getWidthComponentMobile = () => Dimensions.get("window").width - (45 + 36)

export const getWidthComponentDesktop = () => 330