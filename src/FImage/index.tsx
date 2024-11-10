import { Image, ImageSource } from "expo-image"

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

export default function FImage({
  source,
  size = 120,
}: {
  source:
    | string
    | number
    | ImageSource
    | ImageSource[]
    | string[]
    | null
    | undefined
  size?: number
}) {
  return (
    <Image
      style={{ borderRadius: 100, width: size, height: size }}
      source={source}
      placeholder={{ blurhash }}
      contentFit='cover'
      transition={500}
    />
  )
}
