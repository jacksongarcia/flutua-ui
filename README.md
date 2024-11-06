# FLUTUA UI

Uma biblioteca de componentes de UI para react native.

Essa biblioeteca é pensada para ser responsiva para Android, IOS e Web(Desktop e Mobile)

### Menu

##### Exemplo de uso do menu

```ts
import { FMenu } from "flutua-ui"

export default function RootLayout() {
  return (
    <FMenu.context
      pathsMenu={[
        { name: "Home", path: "/" },
        { name: "Preferência", path: "/settings" },
        { name: "Perfil", path: "/settings/profile", notVisible: true }, // Um rota que não será mostrada no menu
      ]}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='settings/index' />
      </Stack>
    </FMenu.context>
  )
}
```

### Input

##### Exemplo de uso do input

```ts
import { FInput } from "flutua-ui"

export default function Page() {
  return <FInput />
}
```

### Input no Menu

##### Exemplo mostra como adicionar componentes como input e botões no menu

```ts
import { useEffect } from "react"
import { Text, View } from "react-native"

import { FInput } from "flutua-ui"
import useMenu from "flutua-ui/dist/hooks/menu"

export default function Page() {
  const { setInputComponent } = useMenu() // Importo o hook da lib par adicionar o input

  // Na inicialização do componente eu faço o inject
  useEffect(() => {
    setInputComponent(<FInput />) // Adicionando o input ao menu
  }, [])

  return (
    <View style={styles.container}>
      <Text>Page</Text>
    </View>
  )
}
```
