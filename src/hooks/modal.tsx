import { createContext, ReactNode, useContext, useState } from "react"

interface ModalContextProps {
  component: ReactNode
  setComponent: Function
  show: boolean
  setShow: Function
}
const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [component, setComponent] = useState<ReactNode | undefined>(undefined)
  const [show, setShow] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        component,
        setComponent: (component: ReactNode) => setComponent(component),
        setShow: (status: boolean) => setShow(status),
        show,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default function useModal() {
  const { component, setComponent, show, setShow } = useContext(ModalContext)

  const insertContent = (content: ReactNode) => {
    setComponent(content)
  }

  const showModal = (status: boolean) => {
    setShow(status)
  }

  return {
    insertContent,
    component,
    showModal,
    show,
  }
}
