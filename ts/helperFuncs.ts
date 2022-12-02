const arrayIsEqual = (a: Boolean[], b: Boolean[]) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
export default arrayIsEqual;
