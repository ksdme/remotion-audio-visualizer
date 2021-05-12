import {Composition} from 'remotion';
import MainScene from './Scenes/Main/Main'

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="MainScene"
				component={MainScene}
				durationInFrames={900}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
