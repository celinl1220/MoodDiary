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

	console.log(summaryData);
}

const getMostPositiveActivity = () => {
	
}