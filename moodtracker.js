const homeWrapper = document.getElementById("home-wrapper");
const calendarWrapper = document.getElementById("calendar-wrapper");
const selectWrapper = document.getElementById("select-wrapper");

const greetingEl = document.getElementById("greeting");

const calendarEl = document.getElementById("calendar");

const detailsEl = document.getElementById("details");

var today = new Date();
var month = today.getMonth() + 1;
var date = today.getDate();
var year = today.getFullYear();
var hour = today.getHours();
var minute = today.getMinutes();

var userName = localStorage.getItem("user-name") || "";
//localStorage.setItem("high-score", highScore);

// // var data = localStorage.getItem("user-data") || {};
var data = {
	20240812: {
		mood: 1,
		activities: ["swimming", "running", "friends", "family", "swimming", "running", "friends", "family", "swimming", "running", "friends", "family", "swimming", "running", "friends", "family", "swimming", "running", "friends", "family"],
		weather: ["sunny"]
	}
};
var dataOpen = {};

const monthsConv = {
	1: "january",
	2: "february",
	3: "march", 
	4: "april", 
	5: "may", 
	6: "june",
	7: "july", 
	8: "august", 
	9: "september", 
	10: "october", 
	11: "november",
	12: "december"
}

const moodsConv = {
	1: "amazing",
	2: "good",
	3: "ok",
	4: "bad",
	5: "horrible"
}

const refreshDate = () => {
	today = new Date();
	month = today.getMonth() + 1;
	date = today.getDate();
	year = today.getFullYear();
	hour = today.getHours();
	minute = today.getMinutes();
}

const showHome = () => {
	refreshDate();
	// console.log(`${month}/${date}/${year} ${hour}:${minute}`);

	homeWrapper.removeAttribute("style");
	calendarWrapper.style.display = "none";

	let greetingOpen = "";
	if (hour < 12) { // AM
		greetingOpen = "good morning";
	} else if (hour < 18) { // between 12PM and 6PM
		greetingOpen = "good afternoon";
	} else { // after 6PM
		greetingOpen = "good evening";
	}
	greetingEl.innerText = `${greetingOpen}${userName=="" ? "!" : ", " + userName + "!"}`;

	document.addEventListener("keyup", showCalendar);
	document.addEventListener("click", showCalendar);
}

const showCalendar = () => {
	document.removeEventListener("keyup", showCalendar);
	document.removeEventListener("click", showCalendar);

	homeWrapper.classList.add("hide-home");
	// homeWrapper.style.display = "none";
	calendarWrapper.removeAttribute("style");
}

const initTracker = () => {
	showHome();
}

const selectDetails = () => {
	console.log("selecting...");
}

const showDetails = (dataOpen, yearNum, monthNum, dateNum) => {
	createDetailsHeader(dataOpen, yearNum, monthNum, dateNum);
	createDetailsMood(dataOpen);
	createDetails(dataOpen, "activities");
	createDetails(dataOpen, "weather");
}

const createDetailsHeader = (dataOpen, yearNum, monthNum, dateNum) => {
	let headerDiv = document.createElement("div");
	headerDiv.className = "header";
	let dateTitle = document.createElement("h1");
	dateTitle.className = "date-open";
	dateTitle.innerText = `${monthsConv[Number(monthNum)]} ${dateNum}, ${yearNum}`;

	headerDiv.appendChild(dateTitle);
	detailsEl.appendChild(headerDiv);
}

const createDetailsMood = (dataOpen) => {
	let moodDiv = document.createElement("div");
	moodDiv.id = "mood"
	moodDiv.className = "details-body";
	let moodData = moodsConv[dataOpen["mood"]];
	let moodHeader = document.createElement("h2");
	moodHeader.innerText = "mood";
	let moodContent = document.createElement("p");
	moodContent.innerText = moodData;

	moodDiv.appendChild(moodHeader);
	moodDiv.appendChild(moodContent);
	detailsEl.appendChild(moodDiv);
}

const createDetails = (dataOpen, type) => {
	let detailsDiv = document.createElement("div");
	detailsDiv.id = type;
	detailsDiv.className = "details-body";
	let detailsData = dataOpen[type];
	let detailsHeader = document.createElement("h2");
	detailsHeader.innerText = type;

	let detailsContent = document.createElement("div");
	detailsContent.className = "content-div"
	detailsData.forEach((el) => {
		let element = document.createElement("span");
		element.innerText = el;
		detailsContent.appendChild(element);
	})

	detailsDiv.appendChild(detailsHeader);
	detailsDiv.appendChild(detailsContent);
	detailsEl.appendChild(detailsDiv);
}

const flipCal = (yearNum, monthNum, dateNum) => {
	// dataOpen = localStorage.getItem(`${yearNum}${monthNum}${dateNum}`) || null;
	dataOpen = data[`${yearNum}${monthNum}${dateNum}`];
	if (!dataOpen) {
		selectDetails();
	} else {
		showDetails(dataOpen, yearNum, monthNum, dateNum);
	}
	calendarWrapper.classList.add("flip");
}

initTracker();
