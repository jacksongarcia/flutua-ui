import { Dimensions } from "react-native"

export const isMobile = () =>
  Dimensions.get("screen").width < 768


export const isDesktop = () => {
  return Dimensions.get("screen").width > 768
}