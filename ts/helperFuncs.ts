// eslint-disable-next-line import/prefer-default-export
export const arrayIsEqual = (arr: boolean[], arr2: boolean[]) => {
	let isEqual = true;
	arr.forEach((element, index) => {
		if (element !== arr2[index]) {
			isEqual = false;
		}
	});
	return isEqual;
};
