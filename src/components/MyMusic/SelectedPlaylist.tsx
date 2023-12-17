import React from 'react';
import '../../css/Sidemenu.css'

interface SelectedPlaylistProps {
	isVisible: boolean
}

const SelectedPlaylist: React.FC<SelectedPlaylistProps> = ({isVisible}) => {
	return (
		<div className={isVisible ? "wrapper menu__opened" : "menu__closed"}>
			
		</div>
	);
};

export default SelectedPlaylist;