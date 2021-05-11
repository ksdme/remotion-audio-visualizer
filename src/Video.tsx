import {Composition} from 'remotion';
import MainScene from './Scenes/Main/Main'

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={MainScene}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
