import {useVideoConfig} from "remotion"

interface Props {
  color?: string
  children: any
  style?: any
}

export default function Canvas({ children, style, color = 'white' }: Props) {
  const {
    width,
    height,
  } = useVideoConfig()

  const containerStyle = {
    ...style,
    width,
    height,
    backgroundColor: color,
  }

  return (
    <div style={containerStyle}>
      {children}
    </div>
  )
}
