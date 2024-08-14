const homeWrapper = document.getElementById("home-wrapper");
const calendarWrapper = document.getElementById("calendar-wrapper");
const selectWrapper = document.getElementById("select-wrapper");

const greetingEl = document.getElementById("greeting");

const calendarEl = document.getElementById("calendar");

var today = new Date();
var month = today.getMonth() + 1;
var date = today.getDate();
var year = today.getFullYear();
var hour = today.getHours();
var minute = today.getMinutes();

var yearOpen = "";
var monthOpen = "";
var dateOpen = "";

var userName = localStorage.getItem("mood-diary-user-name") || "";

var dataOpen = [];

const refreshData = () => {
	dataOpen = [];
	sections.forEach(sect => {
		let toPush = localStorage.getItem(`mood-diary-user-data-${yearOpen}${monthOpen}${dateOpen}-${sect}`);
		dataOpen.push(toPush || "");
	});
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

const flipCal = () => {
	refreshData();
	console.log(dataOpen);
	if (dataOpen.every(el => el === "")) {
		selectDetails();
	} else {
		showDetails();
	}
	calendarWrapper.classList.add("flip");
}

const unFlipCal = () => {
	calendarWrapper.classList.remove("flip");
	setTimeout(clearDetails, 800); // wait for animation to finish to clear details
}

initTracker();
