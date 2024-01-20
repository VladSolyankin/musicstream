import React from 'react';
import {NotificationType} from "@types/index";
import {notification} from "antd";

const MyNotification = ({isOpened, params}) => {
	const [api, contextHolder] = notification.useNotification();
	const openNotification = (type: NotificationType, description: string, message) => {
		api[type]({
			message: message,
			description: description,
			duration: 5
		});
	};

	if (isOpened) openNotification(params.type, params.description, params.message)
	return (
		<div>
			{contextHolder}
		</div>
	);
};

export default MyNotification;