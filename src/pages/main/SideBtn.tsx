import arrow from '@svg/arrow.svg';

const SideBtn = ({ side, state, setState }: any) => (
	<section className=" hover-fade group grid w-12 shrink-0 place-content-center pt-4 ">
		<button title="Close right pane" type="button" onClick={() => setState((prev: boolean) => !prev)} className={` h-8 w-8 rounded-md bg-base p-2 shadow-lg duration-100 ease-in-out hover:scale-110 active:scale-95 ${state ? `rotate-${side ? '180' : '0'} ` : `translate-x-[${side ? '200%' : '-200%'}] group-hover:translate-x-0 rotate-${side ? '0' : '180'}`}`}>
			<img className="inv absolute inset-0 m-auto h-4  w-4" src={arrow} alt="side pane open button" />
		</button>
	</section>
);
export default SideBtn;
