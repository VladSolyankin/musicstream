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
					<div className="flex flex-col justify-start">
						<span className="text-3xl font-jost font-bold">ПЛЕЙЛИСТ</span>
						<span className="text-2xl">{title}</span>
					</div>
					<img src={imagePath} alt="Playlist image" className="h-36 w-36"/>
				</div>

				<button className="flex justify-center min-w-full">
					<img src="src/assets/playlist_play_button.png" alt="" className="w-20 h-20"/>
				</button>

				<ul>
					{
						[1,2,3].map(elem => {

						})
					}
				</ul>
			</div>
		</div>
	);
};

export default SelectedPlaylist;