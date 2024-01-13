import {Button, Checkbox, Form, Input, InputNumber, Space} from 'antd';
import Spline from '@splinetool/react-spline';
import {useNavigate} from "react-router-dom";
import SignUpForm from "../components/Auth/SignUpForm.tsx";

const SignUp = () => {

	return (
		<div className="flex">
			<SignUpForm />
			<Spline className="p-20 hover:animate-pulse" scene="https://prod.spline.design/NIhvxJXCoZPUn8iT/scene.splinecode" />
		</div>
	);
};

export default SignUp;