import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';

import auth from './auth';

const Login = () => {
	const [user, setUser] = useState<User>();
	const [error, setError] = useState(0);
	const [errorContent, setErrorContent] = useState('');
	const [email, setEmail] = useState('');
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const login = async () => {
		try {
			const emailRaw = emailRef.current as unknown as HTMLInputElement;
			setEmail(emailRaw.value);
			const password = passwordRef.current as unknown as HTMLInputElement;
			const userRaw = await signInWithEmailAndPassword(auth, email, password.value);
			setUser(userRaw.user);
		} catch (errorRaw) {
			const stringErr = (errorRaw.code as string).split('-')[1];
			if (stringErr === 'email') {
				setError(1);
				setErrorContent('Invalid Email please try again!!');
			} else if (stringErr === 'password') {
				setErrorContent('Invalid Password please try again!!');
				setError(2);
			} else {
				setErrorContent('Error try again!!');
				setError(3);
			}
		}
	};

	useEffect(() => {
		if (user) {
			window.location.href = user?.uid;
		}
	}, [user]);

	const forgotPassword = () => {
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
		<div className="absolute inset-0 flex flex-col m-auto w-fit h-fit ">
			<h1 className="absolute inset-x-0 mx-auto text-2xl font-bold text-center text-white w-fit h-fit">Sign In</h1>
			<div className="relative flex flex-col w-full my-auto mt-16 mb-4 bot-dash field">
				<input ref={emailRef} autoComplete="off" placeholder=" " type="text" id="email" className="h-8 overflow-hidden text-white border-0 rounded-md w-52 outline-0 input" />
				<label htmlFor="email" className="text-lg text-white label">
					Username
				</label>
			</div>

			<div className="relative flex flex-col w-full my-auto mt-16 mb-4 bot-dash field">
				<input ref={passwordRef} placeholder=" " type="password" id="password" className="h-8 overflow-hidden text-white border-0 rounded-md w-52 outline-0 input" />
				<label htmlFor="password" className="text-lg text-white label">
					Password
				</label>
			</div>

			<div className="flex flex-col items-center gap-2">
				<button type="button" onClick={forgotPassword} className="text-blue underline hover:text-blue-300">
					Forgot Password
				</button>
				<p className={`text-red font-bold text-center w-fit h-fit duration-75 ${error !== 0 ? 'opacity-100' : 'opacity-0'}`}>{errorContent}</p>
				<button
					type="button"
					onClick={login}
					// className={`${
					// 	error === 1 ? "bg-red-500" : `${error === 2 ? "bg-green-500" : `${error === 3 ? "bg-blue-500" : "bg-gray-500"}`}`
					// }  p-2 rounded-sm shadow-lg absolute inset-x-0 mx-auto w-fit duration-75 hover:scale-125 active:scale-90`}
					className={`${error !== 0 ? 'bg-red' : 'bg-mid'}  p-2 rounded-sm shadow-lg w-fit duration-75 hover:scale-125 active:scale-90`}
				>
					Login
				</button>
			</div>
		</div>
	);
};
export default Login;