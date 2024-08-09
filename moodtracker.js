const homeWrapper = document.getElementById("home-wrapper");
const calendarWrapper = document.getElementById("calendar-wrapper");
const selectWrapper = document.getElementById("select-wrapper");

const greetingEl = document.getElementById("greeting");

const calendarEl = document.getElementById("calendar");

var userName = "";

const showHome = () => {
	homeWrapper.removeAttribute("style");
	calendarWrapper.style.display = "none";
	selectWrapper.style.display = "none";

	greetingEl.innerText = `Hello${userName=="" ? "!" : ", " + userName + "!"}`;

	document.addEventListener("keyup", showCalendar);
	document.addEventListener("click", showCalendar);
}

const showCalendar = () => {
	document.removeEventListener("keyup", showCalendar);
	document.removeEventListener("click", showCalendar);

	homeWrapper.classList.add("hide-home");
	// homeWrapper.style.display = "none";
	calendarWrapper.removeAttribute("style");
	selectWrapper.style.display = "none";

	calendarEl
}

const initTracker = () => {
	showHome();
}

initTracker();
