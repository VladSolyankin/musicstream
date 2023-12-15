import React from 'react';
import '../../css/Sidemenu.css'

interface SelectedPlaylistProps {
	isVisible: boolean
}

const SelectedPlaylist: React.FC<SelectedPlaylistProps> = ({isVisible}) => {
	return (
		<div className="wrapper">
			<div className={isVisible ? "menu__closed" : "menu__opened"}>

			</div>
		</div>
	);
};

export default SelectedPlaylist;