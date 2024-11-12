const dataPrefix = "mood-diary-user-data-"; // string that all data stored in localStorage start with

const moodOptions = options[0];
let summaryBodyWrapper = document.createElement("div");
summaryBodyWrapper.className = "summary-body-wrapper";

const createSummaryHeader = () => {
	let headerDiv = document.createElement("div");
	headerDiv.className = "header";

	let title = document.createElement("h1");
	title.className = "summary-title";
	title.innerText = "summary";
	
	headerDiv.appendChild(title);
	summaryWrapper.appendChild(headerDiv);
	summaryWrapper.appendChild(summaryBodyWrapper);
}

const clearSummary = () => {
	summaryBodyWrapper.innerHTML = "";
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

const consecDates = (cur, prev) => {
	let curMomFormatted = moment(cur, "YYYYMMDD").format("YYYYMMDD");
	let prevMom = moment(prev, "YYYYMMDD");
	// console.log("prev:", prevMom.calendar());
	let checkMomFormatted = prevMom.add(1, 'days').format("YYYYMMDD");
	// console.log("cur:", curMomFormatted);
	// console.log("check:", checkMomFormatted);
	return curMomFormatted === checkMomFormatted;
} 

const formatDate = (date) => {
	const yyyy = date.substring(0, 4);
	const mm = date.substring(4, 6);
	const dd = date.substring(6);
	return mm + "/" + dd + "/" + yyyy;

}

const getLongestPosNeg = (posNeg) => {
	let moodComp = posNeg ? [options[0][3], options[0][4]] : [options[0][0], options[0][1]];
	console.log("moodComp:", moodComp);

	const keys = Object.keys(summaryData).sort((a,b) => a-b);
	console.log("sum data:", summaryData);

	// let maxInd = [];
	let maxStreakStart = 0;
	let maxStreakEnd = 0;
	let maxStreak = 0;
	let curStreak = 0;

	let prevDate = 0;
	let curDate = 0;

	for (let i = 0; i < keys.length; i++) {
		curDate = keys[i];
		const curData = summaryData[curDate];
		console.log("prev:", prevDate, "cur:", curDate);
		console.log(consecDates(curDate, prevDate));
		if (curData.mood.some(mood => moodComp.includes(mood))) { // if correct mood
			console.log("correct mood");
			if(curStreak === 0) { // if no streak yet
				maxStreakStart = curDate; // set max streak start date
				maxStreakEnd = curDate; // set max streak end date
				curStreak = 1; // set current streak to 1
				maxStreak = 1; // set max streak to 1
			} else if (consecDates(curDate, prevDate)) { // if streak already exists and is next day
				curStreak++; // increment streak
				if(curStreak >= maxStreak) { // if current streak is longer than or equal to stored max streak
					maxStreak = curStreak; // set max streak to current streak
					maxStreakEnd = curDate; // set max streak end date to current date
				}
			}
		} else { // if not correct mood
			curStreak = 0; // reset current streak to 0
		}
		prevDate = curDate;
	}
	console.log("max:", [maxStreak, formatDate(maxStreakStart), formatDate(maxStreakEnd)]);
	return [maxStreak, formatDate(maxStreakStart), formatDate(maxStreakEnd)];
}

const createStat = (statName, statData) => {
	console.log("statData:", statData);
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
	summaryBodyWrapper.appendChild(statDiv);
}