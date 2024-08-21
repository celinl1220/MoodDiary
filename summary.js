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

const getPosNeg = (posNeg, type) => {
	const moodOptions = options[0];

	let moodComp = posNeg ? [options[0][3], options[0][4]] : [options[0][0], options[0][1]];

	const typeOptions = type==="activities" ? options[1] : options[2];

	console.log("typeOptions:", typeOptions);

	let typeCount = Array(typeOptions.length).fill(0);
	const keys = Object.keys(summaryData);

	let maxInd = [];
	let maxVal = 0;

	for (let i = 0; i < keys.length; i++) {
		const curDate = keys[i];
		const curData = summaryData[curDate];
		const curType = type==="activities" ? curData.activities : curData.weather;
		// if positive mood for that date
		if (curData.mood.some(mood => moodComp.includes(mood))) {
			curType.forEach((type) => {
				let typeIndex = typeOptions.findIndex((op) => op === type);
				typeCount[typeIndex] += 1;
				let curCount = typeCount[typeIndex];
				if (curCount > maxVal) {
					maxVal = curCount;
					maxInd = [typeIndex];
				} else if (curCount === maxVal) {
					maxInd.push(typeIndex);
				}
			})
		}
	}

	let maxActivities = []
	maxInd.forEach((index) => {
		maxActivities.push(typeOptions[index]);
	});
	return maxActivities;
}

const createStat = (statName, statData) => {
	if (!statData.length) {
		statData = ["n/a"];
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