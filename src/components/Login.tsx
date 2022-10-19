import { signInWithEmailAndPassword, User } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "./auth";

const Login = () => {
	const [user, setUser] = useState<User>();
	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			setUser(user.user);
		} catch (error) {
			const errorCode = error.code ;
			const errorMessage = error.message;
		}
	};
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (user) {
			location.href = `/main`;
		}
	}, [user]);

	return (
		<>
			<div className="bg-gray-700 w-fit h-fit rounded-xl my-shadow inset-0 m-auto absolute p-16 flex flex-col">
				<h1 className="text-white w-fit h-fit absolute inset-x-0 mx-auto font-bold text-2xl text-center">Sign In</h1>
				<div className="w-full mt-16 my-auto mb-4 relative flex flex-col bot-dash field">
					<input
						onChange={(e: any) => setEmail(e.target.value)}
						autoComplete="off"
						placeholder=" "
						type="text"
						id="username"
						className="w-52 h-8 rounded-md outline-0 border-0 overflow-hidden input shadow-lg text-white"
					/>
					<label htmlFor="username" className="text-lg text-white label">
						Username
					</label>
				</div>

				<div className="w-full mt-16 my-auto mb-4  relative flex flex-col bot-dash field">
					<input
						onChange={(e: any) => setPassword(e.target.value)}
						placeholder=" "
						type="password"
						id="password"
						className="w-52 h-8 rounded-md outline-0 border-0 overflow-hidden shadow-lg input text-white"
					/>
					<label htmlFor="password" className="text-lg text-white label">
						Password
					</label>
				</div>

				<div>
					<button onClick={login} className="bg-gray-500  p-2 rounded-sm shadow-lg absolute inset-x-0 mx-auto w-fit duration-75 hover:scale-125 active:scale-90">
						Login
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;
