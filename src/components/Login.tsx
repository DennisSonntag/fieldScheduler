import { signInWithEmailAndPassword, sendPasswordResetEmail, User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import auth from "./auth";

const Login = () => {
	const [user, setUser] = useState<User>();
	const [error, setError] = useState(0);
	const [errorContent, setErrorContent] = useState("");
	const [email, setEmail] = useState("");
	const login = async () => {
		try {
			const emailRaw = emailRef.current as unknown as HTMLInputElement;
			setEmail(emailRaw.value);
			const password = passwordRef.current as unknown as HTMLInputElement;
			const user = await signInWithEmailAndPassword(auth, email, password.value);
			setUser(user.user);
		} catch (error) {
			const stringErr = (error.code as string).split("-")[1];
			if (stringErr === "email") {
				setError(1);
				setErrorContent("Invalid Email please try again!!");
			} else if (stringErr === "password") {
				setErrorContent("Invalid Password please try again!!");
				setError(2);
			} else {
				setErrorContent("Error try again!!");
				setError(3);
			}
		}
	};
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	useEffect(() => {
		console.log(error);
	}, [error]);

	useEffect(() => {
		if (user) {
			location.href = `/main`;
		}
	}, [user]);

	const forgotPassword = () => {
		alert("add modal here");
		// try {
		// 	await sendPasswordResetEmail(auth, "sonntagdennis8@gmail.com")
		// 	alert("Email Sent")

		// } catch (error) {
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	alert("Error")

		// }
	};

	return (
		<>
			<div className="w-fit h-fit rounded-xl neo-700 inset-0 m-auto absolute p-16 flex flex-col">
				<h1 className="text-white w-fit h-fit absolute inset-x-0 mx-auto font-bold text-2xl text-center">Sign In</h1>
				<div className="w-full mt-16 my-auto mb-4 relative flex flex-col bot-dash field">
					<input ref={emailRef} autoComplete="off" placeholder=" " type="text" id="username" className="w-52 h-8 rounded-md outline-0 border-0 overflow-hidden input  text-white" />
					<label htmlFor="username" className="text-lg text-white label">
						Username
					</label>
				</div>

				<div className="w-full mt-16 my-auto mb-4  relative flex flex-col bot-dash field">
					<input ref={passwordRef} placeholder=" " type="password" id="password" className="w-52 h-8 rounded-md outline-0 border-0 overflow-hidden  input text-white" />
					<label htmlFor="password" className="text-lg text-white label">
						Password
					</label>
				</div>

				<div className="flex flex-col items-center gap-2">
					<button onClick={forgotPassword} className="underline text-blue-500 hover:text-blue-300">
						Forgot Password
					</button>
					<p className={`text-red-500 font-bold text-center w-fit h-fit duration-75 ${error !== 0 ? "opacity-100" : "opacity-0"}`}>{errorContent}</p>
					<button
						onClick={login}
						// className={`${
						// 	error === 1 ? "bg-red-500" : `${error === 2 ? "bg-green-500" : `${error === 3 ? "bg-blue-500" : "bg-gray-500"}`}`
						// }  p-2 rounded-sm shadow-lg absolute inset-x-0 mx-auto w-fit duration-75 hover:scale-125 active:scale-90`}
						className={`${error !== 0 ? "bg-red-500" : "bg-gray-500"}  p-2 rounded-sm shadow-lg w-fit duration-75 hover:scale-125 active:scale-90`}
					>
						Login
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;
