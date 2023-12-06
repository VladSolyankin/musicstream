import "../../css/Colors.css";
import {useNavigate} from "react-router-dom";

const Header = () => {
	const navigator = useNavigate();
	return (
		<div className="container flex justify-between items-center mx-auto max-w-5xl">
			<div className="flex justify-start items-center basis-3/4 h-16 bg-gray-900 rounded-xl bg-gray-12 my-4 p-4">
				<img onClick={() => navigator("/")}
					src="src/assets/logo-transparent.png" className="w-36 cursor-pointer" alt="Musicstream logo"/>
				<ul className="flex items-center justify-between basis-4/6 text-white text-lg font-jost mx-auto">
					<li className="cursor-pointer" onClick={() => navigator("/tracks")}>Треки</li>
					<li className="cursor-pointer" onClick={() => navigator("/creators")}>Исполнители</li>
					<li className="cursor-pointer" onClick={() => navigator("/my_music")}>Моя музыка</li>
					<li className="cursor-pointer">Прочее</li>
				</ul>
			</div>
			<div className="flex justify-center items-center basis-1/5 w-36 h-16 bg-gray-12 rounded-xl text-2xl">
				<div className="flex justify-center items-center flex-col basis-1/2">
					<img src="src/assets/sign_in_icon.png" alt="Sign in logo" className="w-10 h-10"/>
					<span className="text-sm text-white">Вход</span>
				</div>
				<div className="flex justify-center items-center flex-col basis-1/2">
					<img src="src/assets/sign_up_icon.png" alt="Sign up logo" className="w-10 h-10"/>
					<span className="text-sm text-white">Регистрация</span>
				</div>
			</div>
		</div>
	);
};

export default Header;