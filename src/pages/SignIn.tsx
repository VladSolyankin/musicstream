import Spline from '@splinetool/react-spline';
import SignInForm from "../components/Auth/SignInForm.tsx";

const SignIn = () => {

	const splineStyles = {
		height: "100dvh",
		padding: "10vh"

	}

	return (
		<div className="lg:flex md:flex-row flex-col">
			<SignInForm />
			<Spline className="hidden 2xl:block" scene="https://prod.spline.design/NIhvxJXCoZPUn8iT/scene.splinecode" style={splineStyles}/>
			<div className="hidden justify-center items-center w-screen lg:flex 2xl:hidden">
				<img src="/assets/logo-transparent.png" alt="Logo"/>
			</div>
		</div>
	);
};

export default SignIn;