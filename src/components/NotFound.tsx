import gif from "@img/404.gif"

const NotFound = () => {
	return (
		<div className="w-fit h-fit  p-2 grid place-content-center absolute inset-0 m-auto gap-4">
			<p className="font-bold text-2xl text-center">404 PAGE NOT FOUND</p>
			<img className="rounded-md shadow-2xl" src={gif} alt="" />
		</div>
	);
};

export default NotFound;
