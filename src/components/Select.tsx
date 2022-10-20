import { useEffect, useRef, useState } from "react";


export type SelectOption = {
	label: string;
	value: string;
};

// type MultipleSelectProps = {
// 	multiple: true;
// 	value: string;
// 	onChange: (value: SelectOption[]) => void;
// };

// type SingleSelectProps = {
// 	multiple?: false;
// 	value?: string;
// 	onChange: (value: SelectOption | undefined) => void;
// };

// type SelectProps = {
// 	options: SelectOption[];
// } & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, title, onChange, options, selected }:any)=> {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearOptions = () =>{
		multiple ? onChange([]) : onChange(undefined);
	}

	const selectOption = (option:SelectOption) => {
		if (multiple) {
			if (selected.includes(option)) {
				onChange((prev:SelectOption[]) => prev.push(option));
			} else {
				onChange([...selected, option]);
			}
		} else {
			if (option !== selected) onChange(option);
		}
	}

	const isOptionSelected = (option:SelectOption) => {
		return multiple ? selected.includes(option) : option === selected;
	}

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.target != containerRef.current) return;
			switch (e.code) {
				case "Enter":
				case "Space":
					setIsOpen(prev => !prev);
					if (isOpen) selectOption(options[highlightedIndex]);
					break;
				case "ArrowUp":
				case "ArrowDown": {
					if (!isOpen) {
						setIsOpen(true);
						break;
					}

					const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
					if (newValue >= 0 && newValue < options.length) {
						setHighlightedIndex(newValue);
					}
					break;
				}
				case "Escape":
					setIsOpen(false);
					break;
			}
		};
		containerRef.current?.addEventListener("keydown", handler);

		return () => {
			containerRef.current?.removeEventListener("keydown", handler);
		};
	}, [isOpen, highlightedIndex, options]);

	return (
		<div
			ref={containerRef}
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen(prev => !prev)}
			tabIndex={0}
			className="bg-white relative w-fit min-w-[1.5em]  flex items-center gap-[0.5em] p-[0.5em] rounded-lg outline-none focus:border-blue-400"
		>
			<p>{title}</p>
			<button
				onClick={e => {
					e.stopPropagation();
					clearOptions();
				}}
				className="bg-none text-gray-500 outline-none cursor-pointer p-0 text-[1.25em] hover:text-stone-800 focus:text-stone-800"
			>
				&times;
			</button>
			<div className="bg-gray-500 self-stretch w-[0.05em]"></div>
			<div className="translate-x-0 translate-y-1/4 border-solid border-transparent border-[0.25em] border-t-gray-500"></div>
			<ul className={` absolute m-0 p-0 list-none ${isOpen ? "block" : "hidden"} max-h-[15em] overflow-y-auto border-solid border-[0.05em] border-gray-400 rounded-[0.25em] w-full left-0 top-calc bg-white z-50` }>
				{options.map((option:SelectOption, index:number) => (
					<li
						onClick={e => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
						key={option.value}
						className={`px-[0.25em] py-[0.5em] cursor-pointer ${isOptionSelected(option) ? "bg-sky-400" : ""} ${index === highlightedIndex ? "text-white bg-sky-300" : ""}`}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}


export default Select