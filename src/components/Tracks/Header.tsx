import "../../css/Colors.css";
import {useNavigate} from "react-router-dom";

const Header = () => {
	const navigator = useNavigate();
	return (
		<div className="flex justify-center items-center mx-auto max-w-7xl">
			<div className="flex justify-start items-center basis-3/4 h-16 rounded-xl bg-gray-12 my-4 p-4">
				<img onClick={() => navigator("/")}
					src="src/assets/logo-transparent.png" className="w-36 cursor-pointer" alt="Musicstream logo"/>
				<ul className="flex items-center justify-between basis-4/6 text-white text-lg font-jost mx-auto">
					<li className="cursor-pointer">Треки</li>
					<li className="cursor-pointer">Исполнители</li>
					<li className="cursor-pointer" onClick={() => navigator("/my_music")}>Моя музыка</li>
					<li className="cursor-pointer">Прочее</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;