interface Props {
  color: string
  height: string | number
  width?: string | number
  transform?: string
}

export default function Bar({ color, height, width = 30, transform = 'height 0.1s ease-in' }: Props) {
  const style = {
    height,
    width,
    backgroundColor: color,
    transition: transform,
    borderRadius: 999,
  }

  return (
    <div style={style}>
      &nbsp;
    </div>
  )
}
