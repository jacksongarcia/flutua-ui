import { Dimensions } from "react-native"

export const getWidthComponentMobile = () => Dimensions.get("window").width - (45 + 36)

export const getWidthComponentDesktop = () => 330