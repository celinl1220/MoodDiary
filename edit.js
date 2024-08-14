const activitiesOptions = ["family", "friends", "sports", "studying", "working", "cooking", "meditation", "reading", "TV", "movies"]
const weatherOptions = ["sun", "clouds", "light rain", "heavy rain", "thunderstorm", "snow"]

var moodSel = 0;
var activitiesSel = [];
var weatherSel = [];

const selectDetails = () => {
	clearDetails();
	createDetailsHeader("edit");
	createEdit("mood");
	createEdit("activities");
	createEdit("weather");
}

const saveDetails = () => {
	console.log("saving...");
}

const selectEl = (el) => {
	let clickedEl = el.target
	clickedEl.classList.toggle("selected");
	console.log(clickedEl);
	

}

const createEdit = (type) => {
	let editDiv = document.createElement("div");
	editDiv.id = type;
	editDiv.className = "edit-body";

	let editHeader = document.createElement("h2");
	editHeader.innerText = type;

	let editContent = document.createElement("div");
	editContent.className = "content-div";

	let editData = [];
	if (type === "mood") {
		editData = moodOptions;
	} else if (type === "activities") {
		editData = activitiesOptions;
	} else if (type === "weather") {
		editData = weatherOptions;
	}
	editData.forEach((el) => {
		let element = document.createElement("span");
		// element.className = "not-selected";
		element.classList.add(type);
		element.id = el;
		element.innerText = el;
		element.addEventListener("click", selectEl);
		editContent.appendChild(element);
	})

	editDiv.appendChild(editHeader);
	editDiv.appendChild(editContent);
	detailsEl.appendChild(editDiv);
}