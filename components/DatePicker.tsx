import { clsx, type ClassValue } from 'clsx';
import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
}

const DatePicker: FC<PropTypes> = ({ className, children, ...props }) => {
	return <input {...props} type="date" className={cn('smooth-scale my-border my-shadow relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-accent p-2 text-center hover:bg-accent-light', className)} />;
};

export default DatePicker;
