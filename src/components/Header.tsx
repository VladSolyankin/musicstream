import "../css/Colors.css";

const Header = () => {
	return (
		<div className="container flex justify-between items-center mx-auto max-w-5xl">
			<div className="flex justify-start items-center basis-3/4 h-12 bg-gray-900 rounded-xl bg-gray-12 my-4 p-4">
				<img src="src/assets/logo-transparent.png" className="w-36" alt="Musicstream logo"/>
				<ul className="flex items-center justify-between basis-2/4 text-white text-sm font-jost mx-auto">
					<li>Треки</li>
					<li>Исполнители</li>
					<li>Моя музыка</li>
					<li>Прочее</li>
				</ul>
			</div>
			<div className="flex justify-center items-center basis-1/5 w-36 h-12 bg-gray-12 rounded-xl text-2xl">
				(
				<div className="flex justify-center items-center flex-col basis-1/2">
					<img src="" alt="Sign in logo"/><span></span></div>
				<div className="flex justify-center items-center flex-col basis-1/2">
					<img src="" alt="Sign up logo"/><span></span>
				</div>
			</div>
		</div>
	);
};

export default Header;