import React from 'react';
import {Popover} from "antd";

const CustomPopover = ({children, isOpen, onOpen, content}) => {
	return (
		<Popover
			content={content}
			trigger="click"
			open={isOpen}
			onOpenChange={onOpen}
		>
			{children}
		</Popover>
	);
};

export default CustomPopover;