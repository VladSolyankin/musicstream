import "../css/Colors.css";
import {useNavigate} from "react-router-dom";

const Header = () => {
	const navigator = useNavigate();
	return (
		<div className="flex justify-center items-center mx-auto min-w-full">
			<div className="flex justify-start items-center h-32 bg-gray-12 mb-4 w-full">
				<ul className="flex items-center justify-between text-white text-2xl font-jost mx-auto gap-40">
					<img onClick={() => navigator("/")}
						 src="src/assets/logo-transparent.png" className="w-52 cursor-pointer" alt="Musicstream logo"/>
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