import Bar from '../Bar/Bar'

interface Point {
  height: number
}

interface Props {
  points: Point[]
  color: string
  durationPerSample: number
  barWidth?: string | number
  barMinHeight?: number
  barGap?: number
}

export default function Spectrum({ points, color, durationPerSample, barWidth = 20, barMinHeight = 30, barGap = 20 }: Props) {
  const rootStyle = {
    display: 'grid',
    gridGap: barGap,
    gridAutoFlow: 'column',
    alignItems: 'center',
  }

  const barTransformStyle = (
    `height ${durationPerSample}s ease`
  )

  const elements = points.map((point, index) => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    }

    return (
      <div key={index} style={style}>
        <Bar
          color={color}
          width={barWidth}
          height={Math.max(point.height, barMinHeight)}
          transform={barTransformStyle} />
      </div>
    )
  })

  return (
    <div style={rootStyle}>
      {elements}
    </div>
  )
}
