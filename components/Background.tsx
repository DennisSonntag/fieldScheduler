import type { ReactNode } from 'react';

interface PropType {
	children: ReactNode;
	theme: boolean;
}
const Bg = ({ children, theme }: PropType) => <div className={`smooth-bg absolute m-0 box-border h-screen w-screen bg-back  ${theme ? 'light' : 'dark'} `}> {children}</div>;
export default Bg;
