const ViewBtn = ({ icon, text, setIcon }: any) => (
	<button onClick={() => setIcon()} type="button" className=" no-move smooth absolute top-0 left-0 m-2 h-fit w-fit hover:scale-110 active:scale-90">
		<div className="flex items-center gap-2">
			<img className="inv-1 no-move h-8 w-8 " src={icon} alt="" />
			<p className=" h-fit w-fit font-bold text-base">{text}</p>
		</div>
	</button>
);
export default ViewBtn;
