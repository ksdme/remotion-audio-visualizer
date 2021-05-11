interface Props {
  color: string
  height: string | number
  width?: string | number
}

export default function Bar({ color, height, width = 30 }: Props) {
  const style = {
    height,
    width,
    backgroundColor: color,
    borderRadius: 999,
  }

  return (
    <div style={style}>
      &nbsp;
    </div>
  )
}
