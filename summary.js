const dataPrefix = "mood-diary-user-data-"; // string that all data stored in localStorage start with

const createSummaryHeader = () => {
	let headerDiv = document.createElement("div");
	headerDiv.className = "header";

	let title = document.createElement("h1");
	title.className = "summary-title";
	title.innerText = "summary";
	
	headerDiv.appendChild(title);
	summaryWrapper.appendChild(headerDiv);
}

const clearSummary = () => {
	summaryWrapper.innerHTML = "";
}

var summaryData = {};

const getSummaryData = () => {
	const keys = Object.keys(localStorage);

	keys.forEach((key) => {
		let curVal = localStorage.getItem(key);
		if (key.startsWith(dataPrefix) && curVal) {
			let regex = new RegExp("^(" + dataPrefix + ")");
			let keyDateType = key.slice().replace(regex, "").split("-");
			let keyDate = keyDateType[0];
			let keyType = keyDateType[1];
			if(!summaryData[keyDate]) {
				summaryData[keyDate] =  {};
			}
			summaryData[keyDate][keyType] = curVal.split(",")
		}
	});

	// console.log(summaryData);
}

const getMostPositiveActivities = () => {
	const moodOptions = options[0];
	const activityOptions = options[1];
	let activityCount = Array(activityOptions.length).fill(0);
	const keys = Object.keys(summaryData);

	let maxInd = [];
	let maxVal = 0;

	for (let i = 0; i < keys.length; i++) {
		const curDate = keys[i];
		const curData = summaryData[curDate];
		// if positive mood for that date
		if (curData.mood.includes(moodOptions[0]) || curData.mood.includes(moodOptions[1])) {
			curData.activities.forEach((activity) => {
				let activityIndex = activityOptions.findIndex((op) => op === activity);
				activityCount[activityIndex] += 1;
				let curCount = activityCount[activityIndex];
				if (curCount > maxVal) {
					maxVal = curCount;
					maxInd = [activityIndex];
				} else if (curCount === maxVal) {
					maxInd.push(activityIndex);
				}
			})
		}
	}

	// console.log(activityOptions);
	// console.log(activityCount);
	// console.log(maxVal);
	// console.log(maxInd);

	let maxActivities = []
	maxInd.forEach((index) => {
		maxActivities.push(activityOptions[index]);
	});
	return maxActivities;
}