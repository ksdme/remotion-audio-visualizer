import lodash from 'lodash'
import {Audio, useCurrentFrame, useVideoConfig} from 'remotion'
import Canvas from '../../Components/Canvas/Canvas'
import Spectrum from '../../Components/Spectrum/Spectrum'
import audio from '../../../resources/audio.wav'
import audioConfig from '../../../resources/audio.wav.json'

interface Props {
  audioSrc: any
  config: any
}

export default function MainScene({ audioSrc = audio, config = audioConfig }: Props) {
  const frame = useCurrentFrame()
  const video = useVideoConfig()
  const durationPerSample = config.duration_per_sample
  const framesPerSample = durationPerSample * video.fps
  const maxHeight = 100

  // Returns the point value for the next value
  const getPointValue = (bin: number) => {
    const currentSampleIndex = Math.floor(frame / framesPerSample)
    const factor = lodash.get(config, ['bins', currentSampleIndex + 1, bin])
    return factor * maxHeight
  }

  // Value for each line in the spectrum.
  const points = lodash.range(config.bin_count).map((bin) => {
    return {
      height: getPointValue(bin),
    }
  })

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

      <Audio
        src={audioSrc}
        startFrom={0} />
    </>
  )
}
