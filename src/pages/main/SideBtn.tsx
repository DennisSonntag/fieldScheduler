import arrow from '@svg/arrow.svg';

const SideBtn = ({ side, state, setState }: any) => (
	<section className=" hover-fade group grid w-12 shrink-0 place-content-center pt-4 ">
		{side ? (
			<button title="Close right pane" type="button" onClick={() => setState((prev: boolean) => !prev)} className={state ? 'h-8 w-8 rotate-180 rounded-md bg-base p-2 shadow-lg duration-100 ease-in-out hover:scale-110 active:scale-95' : `translate-x-[200%] group-hover:translate-x-0 rotate-${side ? '0' : '180'} h-8 w-8 rounded-md bg-base p-2 shadow-lg duration-100 ease-in-out hover:scale-110 active:scale-95`}>
				<img className="inv w-4 h-4 inset-0 m-auto  absolute" src={arrow} alt="side pane open button" />
			</button>
		) : (
			<button title="Close left pane" type="button" onClick={() => setState((prev: boolean) => !prev)} className={state ? 'h-8 w-8 rotate-0 rounded-md bg-base p-2 shadow-lg duration-100 ease-in-out hover:scale-110 active:scale-95' : `translate-x-[-200%] group-hover:translate-x-0 rotate-${side ? '0' : '180'} h-8 w-8 rounded-md bg-base p-2 shadow-lg duration-100 ease-in-out hover:scale-110 active:scale-95`}>
				<img className="inv w-4 h-4 inset-0 m-auto  absolute" src={arrow} alt="side pane open button" />
			</button>
		)}
	</section>
);
export default SideBtn;
