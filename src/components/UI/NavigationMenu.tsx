import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import {Dropdown, MenuProps, Space} from 'antd';
import {useNavigate} from "react-router-dom";


const NavigationMenu = ({children}) => {
	const items: MenuProps['items'] = [
		{
			label: <div className="text-3xl font-bold flex justify-center">Навигация</div>,
			key: '0',
		},
		{
			label: <div className="text-2xl sm:hidden block transition duration-300 hover:-translate-y-1 hover:font-bold" onClick={() => navigator('/tracks')}>Треки</div>,
			key: '1',
		},
		{
			label: <div className="text-2xl md:hidden block transition duration-300 hover:-translate-y-1 hover:font-bold" onClick={() => navigator('/creators')}>Исполнители</div>,
			key: '2',
		},
		{
			label: <div className="text-2xl lg:hidden block transition duration-300 hover:-translate-y-1 hover:font-bold" onClick={() => navigator('/my_music')}>Моя музыка</div>,
			key: '3',
		},
		{
			label: <div className="text-2xl xl:hidden block transition duration-300 hover:-translate-y-1 hover:font-bold" onClick={() => navigator('/other')}>Прочее</div>,
			key: '4',
		},
	];

	const navigator = useNavigate()
	return (
		<Dropdown className="xl:hidden" menu={{ items }} trigger={['click']} placement="bottomRight" arrow={{pointAtCenter: true}}>
			{children}
		</Dropdown>
	);
};

export default NavigationMenu;