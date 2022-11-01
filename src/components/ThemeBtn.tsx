import sun from '@svg/sun.svg';
import moon from '@svg/moon.svg';

const ThemeBtn = ({ theme, toggleTheme }: any) => (
	<button type="button" onClick={toggleTheme} className={`w-8 h-8 absolute top-4 left-4 hover:scale-110 active:scale-90 smooth ${theme ? 'invert' : ''}`}>
		<img src={theme ? sun : moon} alt="" srcSet="" />
	</button>
);

export default ThemeBtn;
