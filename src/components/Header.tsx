import "../css/Colors.css";
import {useNavigate} from "react-router-dom";

const Header = () => {
	const navigator = useNavigate();
	return (
		<div className="flex justify-center items-center mx-auto max-w-7xl">
			<div className="flex justify-start items-center h-16 rounded-xl bg-gray-12 my-4 p-4 gap-10">
				<img onClick={() => navigator("/")}
					 src="src/assets/logo-transparent.png" className="w-36 cursor-pointer" alt="Musicstream logo"/>
				<ul className="flex items-center justify-between text-white text-lg font-jost mx-auto gap-20">
					<li className="cursor-pointer" onClick={() => navigator("/tracks")}>Треки</li>
					<li className="cursor-pointer" onClick={() => navigator("/creators")}>Исполнители</li>
					<li className="cursor-pointer" onClick={() => navigator("/my_music")}>Моя музыка</li>
					<li className="cursor-pointer" onClick={() => navigator("/other")}>Прочее</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;