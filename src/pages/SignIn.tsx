import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Spline from '@splinetool/react-spline';
import {useNavigate} from "react-router-dom";

const onFinish = (values: any) => {
	console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};



const SignIn = () => {
	const navigate = useNavigate()

	return (
		<div className="flex">
			<Form
			name="basic"
			labelCol={{span: 8}}
			wrapperCol={{span: 16}}
			style={{maxWidth: 600}}
			initialValues={{remember: true}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			className="h-screen w-1/2 bg-white flex flex-col justify-center items-center basis-1/3"
		>
				<div className="text-2xl mb-5 font-bold">Вход</div>
				<Form.Item<FieldType>
					label="Email"
					name="username"
					rules={[{required: true, message: 'Введите вашу почту!'}]}
					style={{width: "360px"}}
				>
					<Input style={{width: "180px"}}/>
				</Form.Item>

				<Form.Item<FieldType>
					label="Пароль"
					name="password"
					rules={[{required: true, message: 'Введите ваш пароль!'}]}
					style={{width: "360px"}}
				>
					<Input.Password style={{width: "180px"}}/>
				</Form.Item>

				<Form.Item<FieldType>
					name="remember"
					valuePropName="checked"
					wrapperCol={{offset: 8, span: 16}}
					style={{width: "360px"}}
				>
					<Checkbox>Запомнить меня</Checkbox>
				</Form.Item>

				<Form.Item wrapperCol={{offset: 0, span: 16}}>
					<Button type="default" htmlType="submit">
						Войти
					</Button>
				</Form.Item>

				<Form.Item wrapperCol={{offset: 0, span: 16}}>
					<Button type="link" htmlType="submit" onClick={() => navigate("/register")}>
						Ещё нет аккаунта? Регистрация
					</Button>
				</Form.Item>
			</Form>
			<Spline className="p-20" scene="https://prod.spline.design/NIhvxJXCoZPUn8iT/scene.splinecode" />
		</div>
	);
};

export default SignIn;