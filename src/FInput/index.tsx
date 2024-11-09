import { Feather } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native"
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import {
  getWidthComponentDesktop,
  getWidthComponentMobile,
  isDesktop,
} from "../helpers/screen"

export default function FInput() {
  const [isFocus, setFocus] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      width.value = withTiming(Dimensions.get("window").width - 26, {
        duration: 200,
      })
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      width.value = withTiming(
        isDesktop() ? getWidthComponentDesktop() : getWidthComponentMobile(),
        {
          duration: 200,
        }
      )
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const keyboard = useAnimatedKeyboard()
  const width = useSharedValue<number>(
    isDesktop() ? getWidthComponentDesktop() : getWidthComponentMobile()
  )

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }))

  return (
    <Animated.View
      style={[
        {
          width,
        },
        animatedStyles,
      ]}
    >
      <View style={styles.icon}>
        <Feather
          name='search'
          size={21}
          color={isFocus || value.length > 0 ? "#00436a" : "#E8EDF2"}
        />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isFocus || value.length > 0 ? "#00436a" : "#E8EDF2",
          },
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType='done'
        onChangeText={setValue}
        value={value}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#dadfe4",
    elevation: 0.3,
    backgroundColor: "white",
    height: 45,
    color: "#2C698D",
    fontSize: 14,
    fontStyle: "normal",
    alignContent: "center",
    paddingLeft: 41,
    paddingRight: 13,
  },
  icon: {
    position: "absolute",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    marginLeft: 12,
    width: 21,
    bottom: 0,
    zIndex: 9999999,
  },
})
