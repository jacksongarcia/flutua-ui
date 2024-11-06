import { MenuProvider } from "../hooks/menu"
import MenuDefault, { MenuDefaultProps } from "./MenuDefault"

export default function MenuContext({ children, pathsMenu }: MenuDefaultProps) {
  return (
    <MenuProvider>
      <MenuDefault pathsMenu={pathsMenu}>{children}</MenuDefault>
    </MenuProvider>
  )
}
