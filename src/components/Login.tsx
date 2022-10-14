const Login = () => {
	return (
		<>
			<div className="bg-gray-400 w-1/4 h-1/2 rounded-xl my-shadow inset-0 m-auto absolute">
				<p>Username</p>
				<input type="text" />
				<p>Password</p>
				<input type="text" />
				<button className='bg-gray-500 p-2 rounded-sm shadow-lg absolute bottom-10 hover:scale-125 active:scale-90'>
					<a href="/main">Login</a>
				</button>
			</div>
		</>
	);
};

export default Login;
