import { useContext, useEffect, useRef, useState } from 'react';

import { Theme } from '@components/App';
import caret from '@svg/caret.svg';
// import clear from "@svg/clear.svg";

export type SelectOption = {
	label: string;
	value: string;
};

export const Select = ({ multiple, title, setSelected, options, selected }: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearOptions = () => {
		if (multiple) {
			setSelected([]);
		} else {
			setSelected(undefined);
		}
	};

	const selectOption = (option: SelectOption) => {
		if (multiple) {
			if (!selected.map((elm: any) => elm.label).includes(option.label)) {
				setSelected([...selected, option]);
			}
		} else if (option !== selected) setSelected(option);
	};

	const isOptionSelected = (option: SelectOption) => (multiple ? selected.map((elm: any) => elm.value).includes(option.value) : option === selected);

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.target !== containerRef.current) return;
			switch (e.code) {
				case 'Enter':
				case 'Space':
					setIsOpen(prev => !prev);
					if (isOpen) selectOption(options[highlightedIndex]);
					break;
				case 'ArrowUp':
				case 'ArrowDown': {
					if (!isOpen) {
						setIsOpen(true);
						break;
					}

					const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
					if (newValue >= 0 && newValue < options.length) {
						setHighlightedIndex(newValue);
					}
					break;
				}
				case 'Escape':
					setIsOpen(false);
					break;
			}
		};
		const effectRef = containerRef;
		effectRef.current?.addEventListener('keydown', handler);
		return () => {
			effectRef.current?.removeEventListener('keydown', handler);
		};
	}, [isOpen, highlightedIndex, options, selectOption]);

	const theme = useContext(Theme);

	return (
		<button title="Click to select filters" type="button" onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={`select-none shrink-0 ${theme ? 'bg-dark text-white' : 'bg-light text-black'} relative w-fit min-w-[1.5em]  flex items-center gap-[0.5em] p-[0.5em] rounded-md shadow-lg outline-none focus:border-blue-400 hover:scale-110 duration-75 ease-in-out`}>
			<p className="truncate">{title}</p>
			<svg
				onClick={e => {
					e.stopPropagation();
					clearOptions();
				}}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className={`${theme ? 'fill-white' : 'fill-black'} hover:fill-red smooth w-4 h-4 bg-none text-gray-500 outline-none cursor-pointer p-0 text-[1.25em] hover:text-stone-800 focus:text-stone-800`}
			>
				<path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
			</svg>
			<img src={caret} alt="Filter dropdown caret" className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''} ${theme ? 'invert' : ''} duration-75 ease-in-out`} />
			<div className={` absolute m-0 p-0 list-none flex flex-col ${isOpen ? `h-[${40 * options.length}px]` : 'h-0'}  smooth overflow-y-hidden rounded-[0.25em] w-full  left-0 top-calc bg-light`}>
				{options.map((option: SelectOption, index: number) => (
					<button
						type="button"
						onClick={e => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
						key={option.value}
						className={`truncate text-center px-[0.25em] py-[0.5em] cursor-pointer ${isOptionSelected(option) ? 'bg-blue' : ''} ${index === highlightedIndex ? 'text-white bg-lightblue' : ''}`}
					>
						{option.label}
					</button>
				))}
			</div>
		</button>
	);
};
