// import useMenu, { ListPathMenuProps } from "@/hooks/menu"
// import useScreen from "@/hooks/screen"
import { Link, useRouter } from "expo-router"
import { ReactNode, useEffect, useState } from "react"
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import FImage from "../FImage"
import { ImageSource } from "expo-image"
import useMenu, { ListPathMenuProps } from "../hooks/menu"
import useScreen from "../hooks/screen"

export default function MenuDestop({
  children,
  pathsMenu,
  pathName,
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
  const { dimensions, isDesktop } = useScreen()
  const [isHouver, setIsHouver] = useState({ status: false, key: 0 })
  const router = useRouter()
  const { input } = useMenu()
  const [x, setX] = useState(-330)

  const isActiveMenu = (item: ListPathMenuProps) =>
    `/${pathName.split("/")[1]}` == item.path

  useEffect(() => {
    setX(0)
  }, [dimensions])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(x) }],
  }))

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

  return (
    <View style={styles.containerDesktop}>
      <Animated.View
        style={[styles.box, styles.desktop, animatedStyles]}
        onPointerLeave={() => setIsHouver({ status: false, key: -1 })}
      >
        {(sourceImage || title) && (
          <View style={styles.headerMenu}>
            {sourceImage && <FImage source={sourceImage} />}
            {title && <Text style={styles.subtitle}>{title}</Text>}
          </View>
        )}
        <ListMenuDesktop />
      </Animated.View>

      <View style={{ width: "100%", height: "100%" }}>
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

          <View
            style={{
              width: isDesktop() ? 330 : dimensions.window.width - (45 + 36),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {input}
          </View>
        </View>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  itemActive: {
    color: "#00436a",
    paddingLeft: 10,
    backgroundColor: "#fff",
    cursor: Platform.OS != "android" ? undefined : "auto",
    fontWeight: "700",
  },
  containerDesktop: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 12,
    padding: 12,
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
  box: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8EDF2",
    elevation: 0.3,
    backgroundColor: "white",
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
  headerMenu: {
    margin: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    color: "#A3A2BB",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    marginTop: 16,
  },
})
