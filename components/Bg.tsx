import type { ReactNode } from 'react';

type PropType = {
	children: ReactNode;
	theme: boolean;
};
const Bg = ({ children, theme }: PropType) => <div className={`gradient absolute m-0 box-border h-screen w-screen  ${theme ? 'light' : 'dark'} `}> {children}</div>;
export default Bg;
