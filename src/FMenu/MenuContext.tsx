import { MenuProvider } from "../hooks/menu"
import { ModalProvider } from "../hooks/modal"
import MenuDefault, { MenuDefaultProps } from "./MenuDefault"
// import { ModalProvider } from "@/hooks/modal"
// import { MenuProvider } from "@/hooks/menu"

export default function MenuContext({
  children,
  pathsMenu,
  sourceImage,
  title,
}: MenuDefaultProps) {
  return (
    <MenuProvider>
      <ModalProvider>
        <MenuDefault
          pathsMenu={pathsMenu}
          sourceImage={sourceImage}
          title={title}
        >
          {children}
        </MenuDefault>
      </ModalProvider>
    </MenuProvider>
  )
}
