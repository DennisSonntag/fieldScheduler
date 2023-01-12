import type { FC, ReactNode } from 'react';

type PropType = {
	children: ReactNode;
	theme: boolean;
};
const Bg: FC<PropType> = ({ children, theme }) => <div className={`smooth-bg absolute m-0 box-border h-screen w-screen bg-back  ${theme ? 'light' : 'dark'} `}> {children}</div>;
export default Bg;
