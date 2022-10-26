import { useContext } from "react";
import { ThemeProvider, useTheme, useThemeUpdate } from "./ThemeProvider";


const Bg = ({ children }: any) => {
	const darkTheme = useTheme()

	return (
		<>
			<ThemeProvider>
				<div className={`box-border w-screen h-screen m-0 ${darkTheme ? "bg-white" : "my-gradient"} smooth`}> {children}</div>
			</ThemeProvider>
		</>
	);
};

export default Bg;
