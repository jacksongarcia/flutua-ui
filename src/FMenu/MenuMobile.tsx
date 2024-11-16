// import useMenu, { ListPathMenuProps } from "@/hooks/menu"
// import useScreen from "@/hooks/screen"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ReactNode, useEffect, useState } from "react"
import {
  Dimensions,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import FImage from "../FImage"
import { ImageSource } from "expo-image"
import useMenu, { ListPathMenuProps } from "../hooks/menu"
import useScreen from "../hooks/screen"

export default function MenuMobile({
  children,
  pathName,
  pathsMenu,
  pathSelected,
  sourceImage,
  title,
}: {
  children: ReactNode
  pathName: string
  pathSelected: ListPathMenuProps[]
  pathsMenu: ListPathMenuProps[]
  sourceImage?:
    | string
    | number
    | string[]
    | ImageSource
    | ImageSource[]
    | null
    | undefined
  title?: string
}) {
  const width = useSharedValue(0)
  const height = useSharedValue(0)
  const [body, setBody] = useState(false)

  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const router = useRouter()
  const { dimensions, isDesktop } = useScreen()
  const [keyboardStatus, setKeyboardStatus] = useState(false)
  const { input, setPathMenu } = useMenu()

  const handlePressMenuAnimated = (showMenuMobile: boolean) => {
    if (showMenuMobile) {
      setShowMenuMobile(showMenuMobile)

      width.value = withTiming(220)
      height.value = withTiming(110)
      const timeoutId = setTimeout(() => {
        setBody(true)
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      setBody(false)

      width.value = withTiming(0)
      height.value = withTiming(0)

      const timeoutId = setTimeout(() => {
        setShowMenuMobile(showMenuMobile)
      }, 300)

      return () => clearTimeout(timeoutId)
    }
  }

  const isActiveMenu = (item: ListPathMenuProps) =>
    `/${pathName.split("/")[1]}` == item.path

  const ListMenuMobile = () => {
    return (
      <View
        style={[
          styles.listMobile,
          {
            display: "flex",
            width: 220,
            minHeight: 110,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rede",
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width,
              minHeight: height,
            },
            styles.box,
          ]}
        >
          {(sourceImage || title) && body && (
            <View style={styles.headerMenu}>
              {sourceImage && <FImage source={sourceImage} size={35} />}
              {title && (
                <Text style={styles.subtitle}>
                  {`${title.substring(0, 21)} ${
                    title.length > 21 ? "..." : ""
                  }`}
                </Text>
              )}
            </View>
          )}
          {body &&
            pathsMenu.map(
              (itemMenu: ListPathMenuProps, key: number) =>
                !itemMenu.notVisible && (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.itemMobile,
                      isActiveMenu(itemMenu) ? styles.itemActive : undefined,
                    ]}
                    onPress={() => {
                      setShowMenuMobile(false)

                      router.push(itemMenu.path)
                    }}
                    disabled={pathName == itemMenu.path ? true : false}
                  >
                    <Text
                      style={[
                        styles.itemTextMobile,
                        isActiveMenu(itemMenu) ? styles.itemActive : undefined,
                      ]}
                    >
                      {itemMenu.name}
                    </Text>
                  </TouchableOpacity>
                )
            )}
        </Animated.View>
      </View>
    )
  }

  const keyboardTranlateY = useSharedValue<number>(0)

  useEffect(() => {
    setPathMenu(pathsMenu)

    const showSubscription = Keyboard.addListener("keyboardDidShow", (key) => {
      let height =
        Platform.OS == "ios"
          ? key.startCoordinates?.height
          : Keyboard.metrics()?.height

      if (height)
        keyboardTranlateY.value = withTiming(Platform.OS == "ios" ? height : 0)
      setKeyboardStatus(true)
      setShowMenuMobile(false)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      keyboardTranlateY.value = withTiming(0)

      setKeyboardStatus(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <SafeAreaView style={styles.containerMobile}>
      {showMenuMobile && <ListMenuMobile />}
      <View style={styles.mobile}>
        <Animated.View
          style={{
            width: isDesktop() ? 330 : dimensions.window.width - (45 + 36),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: keyboardTranlateY,
          }}
        >
          {input}
        </Animated.View>

        {!keyboardStatus && (
          <TouchableOpacity
            style={[styles.box, styles.menuMobile]}
            onPress={() => handlePressMenuAnimated(!showMenuMobile)}
          >
            <Feather
              name={showMenuMobile ? "minimize-2" : "menu"}
              size={24}
              color='#2C698D'
            />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          paddingTop: Platform.OS == "web" ? 12 : 0,

          paddingLeft: 12,
          paddingRight: 12,
        }}
        onTouchStart={() => setShowMenuMobile(false)}
        onPointerEnter={() => setShowMenuMobile(false)}
      >
        <Text style={[styles.box, styles.path]}>
          {pathSelected[pathSelected.length - 1]?.name.toUpperCase()}
        </Text>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? 12 : 0,
  },
  box: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    elevation: 0.3,
    backgroundColor: "white",
  },

  listMobile: {
    position: "absolute",
    zIndex: 2,
    right: 12,
    bottom: Platform.OS != "web" ? (Platform.OS == "android" ? 78 : 92) : 68,
    display: "flex",
    alignItems: "center",
  },
  itemMobile: {
    width: 210,
    height: 55,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 12,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    borderBottomWidth: 1,
  },
  mobile: {
    position: "absolute",
    bottom: Platform.OS != "web" ? (Platform.OS == "android" ? 18 : 36) : 12,
    display: "flex",
    flexDirection: "row",
    right: 0,
    left: 0,
    gap: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: Platform.OS != "web" ? Dimensions.get("window").width : "100%",
    zIndex: 2,
    justifyContent: "center",
  },
  itemActive: {
    color: "#00436a",
    paddingLeft: 10,
    backgroundColor: "#fff",
    cursor: Platform.OS != "android" ? undefined : "auto",
    fontWeight: "700",
  },
  itemTextMobile: {
    color: "#2C698D",
    fontSize: 14,
    fontStyle: "normal",
  },
  menuMobile: {
    width: 45,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
  path: {
    height: 45,
    width: "100%",
    paddingTop: Platform.OS != "web" ? 13 : "auto",
    textAlign: "center",
    color: "#2C698D",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    alignContent: "center",
    paddingLeft: 13,
    paddingRight: 13,
  },
  headerMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 12,
  },
  subtitle: {
    color: "#A3A2BB",
    fontSize: 14,
    fontStyle: "normal",
  },
})
