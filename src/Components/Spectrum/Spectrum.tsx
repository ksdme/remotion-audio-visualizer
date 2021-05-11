import Bar from '../Bar/Bar'

interface Point {
  height: number
}

interface Props {
  points: Point[]
  color: string
  barWidth?: string | number
  barMinHeight?: number
  barGap?: number
}

export default function Spectrum({ points, color, barWidth = 20, barMinHeight = 30, barGap = 20 }: Props) {
  const rootStyle = {
    display: 'grid',
    gridGap: barGap,
    gridAutoFlow: 'column',
    alignItems: 'center',
  }

  const elements = points.map((point, index) => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    }

    return (
      <div style={style}>
        <Bar
          key={index}
          color={color}
          width={barWidth}
          height={barMinHeight + point.height} />
      </div>
    )
  })

  return (
    <div style={rootStyle}>
      {elements}
    </div>
  )
}
