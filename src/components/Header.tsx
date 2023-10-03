import React from 'react';
import "../css/Colors.css";

const Header = () => {
	return (
		<div className="flex justify-center items-center h-32 bg-black ml-5 mr-q5 mt-5 gray rounded-xl">
			<img src="src/assets/logo-transparent.png" className="w-36"/>
		</div>
	);
};

export default Header;