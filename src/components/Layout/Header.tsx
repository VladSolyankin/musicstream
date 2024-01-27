import "../../css/Colors.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ProfilePopover from "../UI/ProfilePopover.tsx";
import {IoMdMenu} from "react-icons/io";
import NavigationMenu from "../UI/NavigationMenu";

const Header = () => {
	const [isProfileOpen, setProfileOpen] = useState(false)
	const navigator = useNavigate();

	const onProfileOpen = () => setProfileOpen(!isProfileOpen)
	const createListItem = (text: string, breakpoint: string, path: string) => (
		<li className={`cursor-pointer hidden ${breakpoint + ":block"} hover:text-[#AAAAAA] duration-300 -translate-y-[-1] hover:-translate-y-1`}
			onClick={() => navigator(path)}>
			{text}
		</li>
	)

	return (
		<div className="flex justify-center items-center w-full bg-gray-12">
			<div className="flex justify-between items-center h-32 mb-4 gap-20">
				<ul className="flex items-center justify-between text-white text-3xl font-jost mx-auto gap-32">
					<img onClick={() => navigator("/main")} src="/assets/logo-transparent.png" className="w-52 cursor-pointer" alt="Musicstream logo"/>
					{
						createListItem("Треки", "lg", "/tracks")
					}
					{
						createListItem("Исполнители", "lg", "/creators")
					}
					{
						createListItem("Моя музыка", "xl", "/my_music")
					}
					{
						createListItem("Библиотека", "xl", "/library")
					}
				</ul>
				<ProfilePopover
					open={isProfileOpen}
					onOpenChange={onProfileOpen}
				>
					<div className="flex flex-col items-center min-w-[56px] min-h-[56px]" onClick={() => onProfileOpen}>
						<img src="/assets/sign_in_icon.png" alt="User profile button" className="cursor-pointer w-16 h-16 object-fill duration-300 -translate-y-[-1] hover:-translate-y-1 hover:shadow-white hover:shadow-profile hover:rounded-full"/>
					</div>
				</ProfilePopover>

				<NavigationMenu>
					<IoMdMenu className="text-white w-16 h-16 block xl:hidden cursor-pointer"/>
				</NavigationMenu>
			</div>
		</div>
	);
};

export default Header;