import Spline from '@splinetool/react-spline';
import SignInForm from "../components/Auth/SignInForm.tsx";

const SignIn = () => {
	return (
		<div className="flex">
			<SignInForm />
			<Spline className="p-20 w-screen h-screen" scene="https://prod.spline.design/NIhvxJXCoZPUn8iT/scene.splinecode" />
		</div>
	);
};

export default SignIn;