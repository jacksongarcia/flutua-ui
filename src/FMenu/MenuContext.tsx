import { MenuProvider } from "../hooks/menu"
import { ModalProvider } from "../hooks/modal"
import MenuDefault, { MenuDefaultProps } from "./MenuDefault"
// import { ModalProvider } from "@/hooks/modal"
// import { MenuProvider } from "@/hooks/menu"

export default function MenuContext({ children, pathsMenu }: MenuDefaultProps) {
  return (
    <MenuProvider>
      <ModalProvider>
        <MenuDefault pathsMenu={pathsMenu}>{children}</MenuDefault>
      </ModalProvider>
    </MenuProvider>
  )
}
