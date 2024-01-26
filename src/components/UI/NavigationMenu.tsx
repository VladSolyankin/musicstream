import React from 'react';
import {Dropdown, MenuProps} from 'antd';
import {useNavigate} from 'react-router-dom';

const NavigationMenu = ({ children }) => {
	const navigator = useNavigate();

	const createNavItem = (text, path, breakpoint) => (
		<div className={`text-2xl ${breakpoint ? `${breakpoint}:hidden` : ''} flex transition duration-300 hover:-translate-y-1 hover:font-bold`} onClick={() => navigator(path)}>
			{text}
		</div>
	);

	const menuItems: MenuProps['items'] = [
		{
			label: <div className="text-3xl font-bold flex justify-center">Навигация</div>,
			key: '0',
		},
		{
			label: createNavItem('Треки', '/tracks', 'lg'),
			key: '1',
		},
		{
			label: createNavItem('Исполнители', '/creators', 'lg'),
			key: '2',
		},
		{
			label: createNavItem('Моя музыка', '/my_music', 'xl'),
			key: '3',
		},
		{
			label: createNavItem('Библиотека', '/library', 'xl'),
			key: '4',
		},
	];

	return (
		<Dropdown className="xl:hidden" menu={{ items: menuItems }} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
			{children}
		</Dropdown>
	);
};

export default NavigationMenu;
