import lodash from 'lodash'
import {useCurrentFrame, useVideoConfig} from 'remotion'
import Canvas from '../../Components/Canvas/Canvas'
import Spectrum from '../../Components/Spectrum/Spectrum'

const sampleSequence = [
  218, 195, 112, 86, 203, 3, 96, 122, 222, 196, 235, 4, 231, 220, 62, 87,
  24, 188, 68, 202, 201, 134, 158, 10, 25, 162, 110, 40, 182, 83, 233, 104,
  243, 213, 38, 114, 74, 2, 176, 34, 69, 184, 95, 50, 197, 165, 26, 94, 29,
  48, 99, 164, 71, 240, 214, 57, 179, 61, 250, 58, 234, 191, 43, 239, 123,
  22, 210, 101, 23, 180, 168, 193, 175, 73, 103, 75, 97, 194, 32, 219, 169,
  181, 159, 174, 129, 183, 78, 35, 139, 217, 221, 154, 64, 6, 44, 27, 89,
  149, 93, 66, 116, 204, 108, 125, 70, 121, 177, 118, 186, 248, 105, 225,
  33, 136, 17, 91, 117, 223, 119, 51, 20, 12, 120, 28, 198, 140, 190, 111,
  13, 124, 170, 126, 39, 7, 72, 189, 209, 102, 132, 15, 227, 151, 208, 143,
  146, 247, 90, 85, 60, 224, 47, 215, 115, 216, 249, 37, 76, 226, 131, 135,
  41, 172, 92, 80, 88, 5, 21, 185, 228, 56, 11, 161, 59, 107, 211, 232, 157,
  52, 133, 230, 16, 207, 45, 200, 53, 147, 192, 81, 138, 206, 150, 31, 178,
  55, 187, 18, 127, 106, 14, 137, 113, 30, 67, 49, 153, 245, 171, 173, 54, 98,
  167, 237, 36, 242, 244, 199,, 156, 109, 163, 8, 141, 130, 155, 79, 145, 19,
  46, 100, 63, 142, 1, 144, 77, 42, 229, 246, 84, 212, 160, 65, 148, 205, 9,
  82, 128, 241, 236, 238, 152, 166,
]

const sampleSpectrum = lodash.range(8).map(() => {
  const newSequence = lodash.clone(sampleSequence)
  return lodash.shuffle(newSequence)
})

export default function MainScene() {
  const frame = useCurrentFrame()
  const video = useVideoConfig()
  const framesPerSample = 6
  const durationPerSample = framesPerSample / video.fps

  // Returns the point value for the next value
  const getPointValue = (component: number) => {
    const currentSampleIndex = Math.floor(frame / framesPerSample)
    return lodash.get(sampleSpectrum, [component, currentSampleIndex + 1], 0)
  }

  // Value for each line in the spectrum.
  const points = [
    {height: getPointValue(0)},
    {height: getPointValue(1)},
    {height: getPointValue(2)},
    {height: getPointValue(3)},
    {height: getPointValue(4)},
    {height: getPointValue(5)},
    {height: getPointValue(6)},
    {height: getPointValue(7)},
  ]

  const canvasStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const spectrumStyle = {
    width: '75%',
  }

  return (
    <>
      <Canvas style={canvasStyle}>
        <div style={spectrumStyle}>
          <Spectrum
            points={points}
            color="#383e56"
            barGap={8}
            barWidth="75%"
            barMinHeight={120}
            durationPerSample={durationPerSample} />
        </div>
      </Canvas>
    </>
  )
}
