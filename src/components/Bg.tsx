type PropType = {
	children: JSX.Element | JSX.Element[];
	theme: boolean;
};
const Bg = ({ children, theme }: PropType) => <div className={`absolute box-border w-screen h-screen m-0 gradient-tall ${theme ? '' : 'gradient-move'}  ease-in-out duration-500`}> {children}</div>;
export default Bg;
