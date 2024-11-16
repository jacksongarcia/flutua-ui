import { Feather } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import useScreen from "../hooks/screen"
import { WIDTH_COMPONENT_WEB } from "../constants/screen"
// import useScreen from "@/hooks/screen"
// import { WIDTH_COMPONENT_WEB } from "@/constants/screen"

interface FInputProps {
  icon?: "search" | "user" | "lock"
  password?: boolean
  placeholder?: string
  type?: "default" | "email-address" | "phone-pad" | "numeric"
  onChange?: ((text: string) => void) | undefined
}

export default function FInput({
  icon,
  password = false,
  placeholder,
  type = "default",
  onChange,
}: FInputProps) {
  const [isFocus, setFocus] = useState(false)
  const { dimensions, isDesktop } = useScreen()
  const width = useSharedValue<number>(0)
  const [body, setBody] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(password)

  useEffect(() => {
    width.value = withTiming(
      isDesktop() ? WIDTH_COMPONENT_WEB : dimensions.window.width - (45 + 36)
    )

    const timeoutId = setTimeout(() => {
      setBody(true)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  const [textInput, setTextInput] = useState("")

  const onChangeText = (value: string) => {
    setTextInput(value)
    onChange && onChange(value)
  }

  return (
    <Animated.View
      style={[
        {
          width,
          display: "flex",
          justifyContent: "center",
        },
      ]}
    >
      {body && icon && (
        <View style={styles.icon}>
          <Feather
            name={icon}
            size={21}
            color={isFocus || textInput.length > 0 ? "#00436a" : "#E8EDF2"}
          />
        </View>
      )}
      {body && password && (
        <TouchableOpacity
          style={[styles.icon, { right: 12 }]}
          activeOpacity={0.5}
          onPress={() =>
            textInput != "" && setVisiblePassword(!visiblePassword)
          }
        >
          <Feather
            name={!visiblePassword ? "eye" : "eye-off"}
            size={21}
            color={isFocus || textInput.length > 0 ? "#00436a" : "#E8EDF2"}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={[
          styles.input,
          {
            paddingLeft: icon ? 41 : 14,

            borderColor:
              isFocus || textInput.length > 0 ? "#00436a" : "#E8EDF2",
          },
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType='done'
        onChangeText={onChangeText}
        value={textInput}
        placeholder={placeholder}
        placeholderTextColor='#A3A2BB'
        secureTextEntry={visiblePassword}
        keyboardType={type}
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
