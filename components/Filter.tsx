import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import caret from '@svg/caret.svg';
import Image from 'next/image';

type PropType = {
	title: string;
	options: string[];
	selected: string[];
	scroll?: boolean;
	setSelected: Dispatch<SetStateAction<string[]>>;
};

const Filter = ({ title, setSelected, options, selected, scroll = false }: PropType) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearOptions = () => {
		setSelected([]);
	};

	const arrayRemove = (array: string[], value: string) => array.filter(geeks => geeks !== value);

	const selectOption = (option: string) => {
		if (!selected.includes(option)) {
			setSelected([...selected, option]);
		} else {
			setSelected(arrayRemove(selected, option));
		}
	};

	const isOptionSelected = (option: string) => selected.includes(option);

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

	return (
		<button title="Click to select filters" type="button" onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className="my-shadow my-border my-shadow relative z-[999] m-auto flex w-fit shrink-0  select-none items-center gap-[0.5em] rounded-md bg-main p-[0.5em] text-invert outline-none duration-75 ease-in-out hover:z-[99999] hover:scale-110 focus:border-gray-800">
			<p className="whitespace-nowrap">{title}</p>
			<svg
				onClick={e => {
					e.stopPropagation();
					clearOptions();
				}}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className="smooth h-4 w-4 shrink-0 cursor-pointer fill-invert p-0  hover:fill-red-700"
			>
				<path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
			</svg>

			<Image src={caret} alt="Filter dropdown caret" className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''} inv duration-75 ease-in-out`} />

			<div className={`${scroll ? 'h-[10rem] overflow-y-scroll' : null} my-border my-shadow absolute m-0 flex list-none flex-col bg-main  p-0 hover:z-50 ${isOpen ? `h-[${40 * options.length}px]` : 'hidden h-0'}  top-calc left-0 z-50 w-full overflow-y-hidden  rounded-[0.25em] duration-300  ease-in-out`}>
				{options.map((option: string, index: number) => (
					<option
						onClick={e => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
						key={option}
						className={`my-border m-2 h-fit cursor-pointer truncate rounded-md  text-center ${isOptionSelected(option) ? 'bg-accent' : 'bg-main'} ${index === highlightedIndex ? 'bg-light text-invert' : null} `}
					>
						{option}
					</option>
				))}
			</div>
		</button>
	);
};
export default Filter;
