const homeWrapper = document.getElementById("home-wrapper");
const calendarWrapper = document.getElementById("calendar-wrapper");
const selectWrapper = document.getElementById("select-wrapper");

const greetingEl = document.getElementById("greeting");

const calendarEl = document.getElementById("calendar");

var userName = "";

const showHome = () => {
	var today = new Date();
	var month = today.getMonth() + 1;
	var date = today.getDate();
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	// console.log(`${month}/${date}/${year} ${hour}:${minute}`);

	homeWrapper.removeAttribute("style");
	calendarWrapper.style.display = "none";
	selectWrapper.style.display = "none";

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
	selectWrapper.style.display = "none";

	// calendarEl
}

const initTracker = () => {
	showHome();
}

initTracker();
