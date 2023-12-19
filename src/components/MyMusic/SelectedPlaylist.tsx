import React from 'react';
import '../../css/Sidemenu.css'

interface SelectedPlaylistProps {
	isVisible: boolean,
	imagePath: string,
	title: string,
	onPlaylistClosed: () => void;
}

const SelectedPlaylist: React.FC<SelectedPlaylistProps> = ({isVisible, imagePath, title, onPlaylistClosed}) => {

	const onMenuClosed = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		const menuClassList = event.currentTarget.parentElement?.classList;
		menuClassList?.replace("wrapper", "menu__closed")
		onPlaylistClosed()
	}
	return (
		<div className={isVisible ? "wrapper" : "menu__closed overscroll-contain"}>
			<div className="menu__background" onClick={onMenuClosed}></div>
			<div className="menu__opened">
				<div className="flex justify-between">
					<div>
						<h2>ПЛЕЙЛИСТ</h2>
						<h3>{title}</h3>
					</div>
					<img src={imagePath} alt="Playlist image" className="h-12 w-12"/>
				</div>

				<button className="flex justify-center min-w-full">
					<img src="./src/assets/playlist_play_button.png" alt="" className="w-20 h-20"/>
				</button>

				<ol className="list-disc">
					<li>hello</li>
				</ol>
			</div>
		</div>
	);
};

export default SelectedPlaylist;