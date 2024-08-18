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

const getPosNegActivities = (posNeg) => {
	const moodOptions = options[0];
	let moodComp = [];
	if (posNeg === 0) { // get positive activities
		moodComp = [options[0][0], options[0][1]];
	} else if (posNeg === 1) {
		moodComp = [options[0][3], options[0][4]];
	}
	const activityOptions = options[1];
	let activityCount = Array(activityOptions.length).fill(0);
	const keys = Object.keys(summaryData);

	let maxInd = [];
	let maxVal = 0;

	for (let i = 0; i < keys.length; i++) {
		const curDate = keys[i];
		const curData = summaryData[curDate];
		// if positive mood for that date
		if (curData.mood.some(mood => moodComp.includes(mood))) {
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

	let maxActivities = []
	maxInd.forEach((index) => {
		maxActivities.push(activityOptions[index]);
	});
	return maxActivities;
}

const createStat = (statName, statData) => {
	if (!statData.length) {
		statData = ["N/A"];
	}

	let statDiv = document.createElement("div");
	statDiv.id = statName;
	statDiv.className = "summary-body";

	let statHeader = document.createElement("h2");
	statHeader.innerText = statName;

	let statContent = document.createElement("div");
	statContent.className = "content-div"
	statData.forEach((el) => {
		let element = document.createElement("span");
		element.innerText = el;
		statContent.appendChild(element);
	})

	statDiv.appendChild(statHeader);
	statDiv.appendChild(statContent);
	summaryWrapper.appendChild(statDiv);
}