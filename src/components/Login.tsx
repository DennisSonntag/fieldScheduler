const Login = () => {
	return (
		<>
			<div className="bg-gray-700 w-1/4 h-1/2 rounded-xl my-shadow inset-0 m-auto absolute p-16">
				<h1 className="text-white font-bold text-2xl text-center">Sign In</h1>
				<div className="w-full mt-16 my-auto mb-4 relative flex flex-col bot-dash field">
					<input autoComplete="off" placeholder=" " type="text" id="username" className="w-52 h-8 rounded-md outline-0 border-0 overflow-hidden input shadow-lg text-white" />
					<label htmlFor="username" className="text-lg text-white label">
						Username
					</label>
				</div>
				<div className="w-full mt-16 my-auto mb-4  relative flex flex-col bot-dash field">
					<input  placeholder=" " type="password" id="password" className="w-52 h-8 rounded-md outline-0 border-0 overflow-hidden shadow-lg input text-white" />
					<label htmlFor="password" className="text-lg text-white label">
						Password
					</label>
				</div>

				<button className="bg-gray-500 p-2 rounded-sm shadow-lg inset-x-0 mx-auto w-fit duration-75  absolute bottom-10 hover:scale-125 active:scale-90">
					<a href="/main">Login</a>
				</button>
			</div>
		</>
	);
};

export default Login;
