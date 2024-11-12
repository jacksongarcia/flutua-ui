import "@expo/match-media"
import { usePathname } from "expo-router"
import { ReactNode, useEffect, useState } from "react"
import FModal from "../FModal"
import MenuMobile from "./MenuMobile"
import MenuDestop from "./MenuDesktop"
import useMenu, { ListPathMenuProps } from "../hooks/menu"
import useScreen from "../hooks/screen"
import useModal from "../hooks/modal"
// import useModal from "@/hooks/modal"
// import useScreen from "@/hooks/screen"
// import useMenu, { ListPathMenuProps } from "@/hooks/menu"
import { ImageSource } from "expo-image"
export interface MenuDefaultProps {
  children: ReactNode
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
}

export default function MenuDefault({
  children,
  pathsMenu,
  sourceImage,
  title,
}: MenuDefaultProps) {
  const { isDesktop } = useScreen()
  const { show } = useModal()
  const pathName = usePathname() || "/"
  const [pathSelected, setPathSelected] = useState<ListPathMenuProps[]>([])
  const { setPathMenu } = useMenu()

  useEffect(() => {
    setPathMenu(pathsMenu)
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

  return (
    <>
      {show && <FModal textButton='HA HA' />}

      {!isDesktop() && (
        <MenuMobile
          pathsMenu={pathsMenu}
          pathName={pathName}
          pathSelected={pathSelected}
          sourceImage={sourceImage}
          title={title}
        >
          {children}
        </MenuMobile>
      )}

      {isDesktop() && (
        <MenuDestop
          pathsMenu={pathsMenu}
          pathName={pathName}
          pathSelected={pathSelected}
          sourceImage={sourceImage}
          title={title}
        >
          {children}
        </MenuDestop>
      )}
    </>
  )
}
