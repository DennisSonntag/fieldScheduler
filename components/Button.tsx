import { clsx, type ClassValue } from 'clsx';
import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
	text?: string;
	children?: ReactNode;
}

const Button: FC<PropTypes> = ({ className, text, children, ...props }) => {
	return (
		<button {...props} type="button" className={cn('smooth-scale my-border my-shadow rounded-md bg-accent p-2 hover:bg-accent-light active:scale-90', className)}>
			<p>{text}</p>
			{children}
		</button>
	);
};

export default Button;
