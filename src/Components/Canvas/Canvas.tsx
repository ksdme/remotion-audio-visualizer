import {useVideoConfig} from "remotion"

interface Props {
  color?: string
  children: any
}

export default function Canvas({ children, color = 'white' }: Props) {
  const {
    width,
    height,
  } = useVideoConfig()

  const style = {
    width,
    height,
    backgroundColor: color,
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}
