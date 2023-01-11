import arrow from '@svg/arrow.svg';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface PropType {
	leftOpen: boolean;
	setLeftOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBtn = ({ leftOpen, setLeftOpen }: PropType) => (
	<section className=" hover-fade group grid w-12 shrink-0 place-content-center pt-4 ">
		<button title="Close right pane" type="button" onClick={() => setLeftOpen((prev: boolean) => !prev)} className={`my-border h-8 w-8 rounded-md bg-main p-2 duration-100 ease-in-out hover:scale-110 active:scale-95  ${leftOpen ? 'rotate-0 ' : 'translate-x-[-200%] rotate-180 group-hover:translate-x-0'}`}>
			<Image className="inv-1w-4 absolute inset-0 m-auto  h-4" src={arrow} alt="side pane open button" />
		</button>
	</section>
);
export default SideBtn;
