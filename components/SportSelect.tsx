type PropType = {
	sport: string;
	setActivePage: () => void;
	activePage: boolean;

}

const SportSelect = ({ activePage, setActivePage, sport }: PropType) => (
	<button title={`${sport} page`} type="button" onClick={setActivePage} className={` ${activePage ? 'bg-base' : 'bg-mid'}  relative h-[2.5rem] w-[16rem] rounded-md ${sport === 'Rugby' ? 'origin-top-right rounded-bl-[1.5rem] shadow-2xl ' : 'origin-top-left rounded-br-[1.5rem] shadow-2xl'} select-none  duration-150 ease-in-out hover:scale-105 active:scale-95`}>
		<h1 className={`${activePage ? 'text-stark' : 'text-invert'} absolute inset-0 m-auto inline-block h-fit w-fit text-lg font-bold`}>{sport}</h1>
	</button>
);
export default SportSelect;
