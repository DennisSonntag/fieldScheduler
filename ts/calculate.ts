const schoolAmount = 36;
const seniorityAmount = 2;
const divAmount = 3;
const teamPerDivAmount = 12;
const totalTeams = schoolAmount * seniorityAmount * divAmount * teamPerDivAmount;

// eslint-disable-next-line import/prefer-default-export
export const calculate = () => {
	// eslint-disable-next-line no-console
	console.log(totalTeams);
};
