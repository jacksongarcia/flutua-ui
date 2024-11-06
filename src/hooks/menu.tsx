import { Href, usePathname } from "expo-router"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

export interface ListPathMenuProps {
  name: string
  path: Href<string | object>
  notVisible?: boolean
  component?: ReactNode | null
}

interface MenuContextProps {
  input: ReactNode | null
  setInput: Function
  path: Href<string | object>
  setPath: Function
  pathsMenu: ListPathMenuProps[]
  setPathMenu: Function
}
const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<ReactNode | null>(null)
  const [path, setPath] = useState<Href<string | object>>("/")
  const [pathsMenu, setPathMenu] = useState<ListPathMenuProps[]>([])

  return (
    <MenuContext.Provider
      value={{
        input,
        setInput: (input: ReactNode | null) => setInput(input),
        path,
        setPath: (path: Href<string | object>) => setPath(path),
        pathsMenu,
        setPathMenu: (listPathMenu: ListPathMenuProps[]) =>
          setPathMenu(listPathMenu),
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default function useMenu() {
  const pathName = usePathname()

  const { input, setInput, path, setPath, pathsMenu, setPathMenu } =
    useContext(MenuContext)

  const setInputComponent = (component: ReactNode | null) => {
    setInput(component)
    pathsMenu.map((pathMenu) => {
      if (pathMenu.path == pathName) {
        pathMenu.component = component
      }
    })
    setPath(pathName)
  }

  useEffect(() => {
    console.info(`PATH: ${path} | PATHNAME: ${pathName}`)
    pathsMenu.map((pathMenu) => {
      if (pathMenu.path == pathName) {
        setInput(pathMenu.component)
      }
    })
  }, [pathName])

  return {
    setInputComponent,
    input,
    setPathMenu,
  }
}
