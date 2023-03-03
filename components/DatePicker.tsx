import { clsx, type ClassValue } from 'clsx';
import { FC, LegacyRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	ref?: LegacyRef<HTMLInputElement>;
}

const DatePicker: FC<PropTypes> = ({ className, ref, children, ...props }) => {
	return <input ref={ref} {...props} type="date" className={cn('smooth-scale my-border my-shadow  rounded-md bg-accent p-2 text-center hover:scale-105 active:scale-95', className)} />;
};

export default DatePicker;
