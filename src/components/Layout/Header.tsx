import "../../css/Colors.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ProfilePopover from "../UI/ProfilePopover.tsx";

const Header = () => {
	const [isProfileOpen, setProfileOpen] = useState(false)
	const navigator = useNavigate();

	const onProfileOpen = () => setProfileOpen(!isProfileOpen)
	return (
		<div className="flex justify-center items-center mx-auto min-w-full">
			<div className="flex justify-start items-center h-32 bg-gray-12 mb-4 w-full">
				<ul className="flex items-center justify-between text-white text-2xl font-jost mx-auto gap-40">
					<img onClick={() => navigator("/main")} src="src/assets/logo-transparent.png" className="w-52 cursor-pointer" alt="Musicstream logo"/>
					<li className="cursor-pointer hidden sm:block" onClick={() => navigator("/tracks")}>Треки</li>
					<li className="cursor-pointer hidden md:block" onClick={() => navigator("/creators")}>Исполнители</li>
					<li className="cursor-pointer hidden lg:block" onClick={() => navigator("/my_music")}>Моя музыка</li>
					<li className="cursor-pointer hidden xl:block" onClick={() => navigator("/other")}>Прочее</li>
					<ProfilePopover
						open={isProfileOpen}
						onOpenChange={onProfileOpen}
						>
						<div className="flex flex-col items-center min-w-[56px] min-h-[56px]" onClick={() => onProfileOpen}>
							<img src="src/assets/sign_in_icon.png" alt="User profile button" className="cursor-pointer w-16 h-16 object-fill"/>
						</div>
					</ProfilePopover>
				</ul>
			</div>
		</div>
	);
};

export default Header;