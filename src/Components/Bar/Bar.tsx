interface Props {
  color: string
  height: number
  width?: number
}

export default function Bar({ color, height, width = 30 }: Props) {
  const style = {
    height,
    width,
    backgroundColor: color,
    borderRadius: width / 2,
  }

  return (
    <div style={style}>
      &nbsp;
    </div>
  )
}
