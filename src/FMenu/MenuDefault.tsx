import useMenu, { ListPathMenuProps, MenuProvider } from "../hooks/menu"
import "@expo/match-media"
import { Feather } from "@expo/vector-icons"
import { Link, usePathname, useRouter } from "expo-router"
import { ReactNode, useCallback, useEffect, useState } from "react"
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Animated, { useSharedValue, withTiming } from "react-native-reanimated"
import { isDesktop, isMobile } from "../helpers/screen"

export interface MenuDefaultProps {
  children: ReactNode
  pathsMenu: ListPathMenuProps[]
}

export default function MenuDefault({ children, pathsMenu }: MenuDefaultProps) {
  const [isHouver, setIsHouver] = useState({ status: false, key: 0 })
  const [showMenuMobile, setShowMenuMobile] = useState(false)

  const pathName = usePathname() || "/"
  const router = useRouter()

  const [pathSelected, setPathSelected] = useState<ListPathMenuProps[]>([])

  const [keyboardStatus, setKeyboardStatus] = useState(false)

  const { input, setPathMenu } = useMenu()

  useEffect(() => {
    setPathMenu(pathsMenu)

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true)
      setShowMenuMobile(false)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  useEffect(() => {
    let listPath: ListPathMenuProps[] = []

    const paths = pathName.split("/")
    if (paths.length > 2) {
      paths.shift()

      paths.map((path, key) => {
        let newPath = ""
        for (let index = 0; index < key + 1; index++) {
          newPath = `${newPath}/${paths[index]}`
        }
        const item = pathsMenu.find((item) => item.path == newPath)
        if (item) {
          listPath.push(item)
        }
      })
    } else {
      const item = pathsMenu.find((item) => item.path == pathName)
      if (item) listPath.push(item)
    }

    setPathSelected(listPath)
  }, [pathName])

  const isActiveMenu = (item: ListPathMenuProps) =>
    `/${pathName.split("/")[1]}` == item.path

  const ListMenuDesktop = () => {
    return (
      <View
        style={styles.list}
        onPointerLeave={() => setIsHouver({ status: false, key: -1 })}
      >
        {pathsMenu.map(
          (itemMenu: ListPathMenuProps, key: number) =>
            !itemMenu.notVisible && (
              <Pressable
                key={key}
                style={[
                  styles.item,
                  isActiveMenu(itemMenu) ? styles.itemActive : undefined,
                ]}
                onPointerEnter={() => setIsHouver({ status: true, key })}
                onPointerLeave={() => setIsHouver({ status: false, key })}
                onPointerDown={() => router.push(itemMenu.path)}
              >
                <Text
                  style={[
                    styles.itemText,
                    isHouver.status && isHouver.key == key
                      ? styles.itemHouver
                      : undefined,
                    isActiveMenu(itemMenu) ? styles.itemActive : undefined,
                  ]}
                >
                  {itemMenu.name}
                </Text>
              </Pressable>
            )
        )}
      </View>
    )
  }

  const width = useSharedValue(210)

  const handlePressMenuAnimated = (showMenuMobile: boolean) => {
    if (showMenuMobile) {
      setShowMenuMobile(showMenuMobile)

      width.value = withTiming(220)
    } else {
      width.value = 210
      setShowMenuMobile(showMenuMobile)
    }
  }

  const ListMenuMobile = () => {
    return (
      <Animated.View
        style={[
          {
            width,
          },
          styles.box,
          styles.listMobile,
        ]}
      >
        {pathsMenu.map(
          (itemMenu: ListPathMenuProps, key: number) =>
            !itemMenu.notVisible && (
              <TouchableOpacity
                key={key}
                style={[
                  styles.itemMobile,
                  isActiveMenu(itemMenu) ? styles.itemActive : undefined,
                ]}
                onPress={() => router.push(itemMenu.path)}
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
    )
  }

  return (
    <>
      {isMobile() && (
        <SafeAreaView style={styles.containerMobile}>
          {showMenuMobile && <ListMenuMobile />}
          <View style={styles.mobile}>
            {input}

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
              margin: 0,
              gap: 12,
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
      )}
      {isDesktop() && (
        <View style={styles.containerDesktop}>
          <View
            style={[styles.box, styles.desktop]}
            onPointerLeave={() => setIsHouver({ status: false, key: -1 })}
          >
            <ListMenuDesktop />
          </View>
          <View style={{ width: "100%", height: "100%", gap: 12 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
              <Text style={[styles.box, styles.path, { width: "auto" }]}>
                {pathSelected.map((path, key) => (
                  <Link href={path.path} key={key}>
                    {`${path.name.toUpperCase()} ${
                      pathSelected.length == key + 1 ? "" : " / "
                    }`}
                  </Link>
                ))}
              </Text>
              {input}
            </View>
            {children}
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  containerMobile: {
    height: "100%",
    width: "100%",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: Platform.OS == "web" ? 12 : Platform.OS == "android" ? 8 : 0,
    display: "flex",
    gap: 12,
  },
  containerDesktop: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 12,
    padding: 12,
  },
  box: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    elevation: 0.3,
    backgroundColor: "white",
  },
  menuMobile: {
    width: 45,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
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
    zIndex: 999999,
    justifyContent: "flex-end",
  },
  desktop: {
    width: 330,
    borderColor: "#E8EDF2",
    alignItems: "center",
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
  list: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingBottom: 25,
  },
  item: {
    width: 280,
    height: 55,
    paddingLeft: 12,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    borderBottomWidth: 1,
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  itemText: {
    color: "#2C698D",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    paddingTop: 20,
  },
  itemHouver: {
    color: "#2c698d95",
  },

  listMobile: {
    position: "absolute",
    zIndex: 99999,
    right: 12,
    bottom: Platform.OS != "web" ? (Platform.OS == "android" ? 78 : 92) : 68,
    display: "flex",
    width: 220,
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

  itemTextMobile: {
    color: "#2C698D",
    fontSize: 14,
    fontStyle: "normal",
  },

  itemActive: {
    color: "#00436a",
    paddingLeft: 10,
    backgroundColor: "#fff",
    cursor: Platform.OS != "android" ? undefined : "auto",
    fontWeight: "700",
  },
})
