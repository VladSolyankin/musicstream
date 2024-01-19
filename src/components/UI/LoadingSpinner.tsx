import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons'

const LoadingSpinner = ({isSpinning}) => {
	return (
		<div className="flex flex-col gap-5">
			<Spin indicator={<LoadingOutlined style={{fontSize: 48}} />} spinning={isSpinning}/>
			<span className="text-2xl text-white">Loading...</span>
		</div>
	);
};

export default LoadingSpinner;