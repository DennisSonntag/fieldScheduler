import type { ReactNode } from 'react';

type PropType = {
	children: ReactNode;
	theme: boolean;
};
const Bg = ({ children, theme }: PropType) => <div className={`absolute m-0 smooth-bg box-border h-screen w-screen bg-back  ${theme ? 'light' : 'dark'} `}> {children}</div>;
export default Bg;
