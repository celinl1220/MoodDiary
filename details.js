const detailsEl = document.getElementById("details");

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

const sections = ["mood", "activities", "weather"];
const options = [["amazing", "good", "ok", "bad", "horrible"], ["family", "friends", "sports", "studying", "working", "cooking", "meditation", "reading", "TV", "movies"], ["sun", "clouds", "light rain", "heavy rain", "thunderstorm", "snow"]];

const showDetails = () => {
	createDetailsHeader("details");
	createDetails("mood");
	createDetails("activities");
	createDetails("weather");
}

const clearDetails = () => {
	detailsEl.innerHTML = "";
}

const createDetailsHeader = (type) => {
	let headerDiv = document.createElement("div");
	headerDiv.className = "header";

	let dateTitle = document.createElement("h1");
	dateTitle.className = "date-open";
	dateTitle.innerText = `${monthsConv[Number(monthOpen)]} ${dateOpen}, ${yearOpen}`;
	
	let leftBtn = document.createElement("div");
	leftBtn.className = "details-btn";
	
	if (type === "details") {
		leftBtn.id = "back-btn";
		leftBtn.innerText = "back"; // replace with back arrow later?
		leftBtn.addEventListener("click", unFlipCal);
	} else if (type === "edit") {
		leftBtn.id = "cancel-btn";
		leftBtn.innerText = "x"; // replace with back arrow later?
		leftBtn.addEventListener("click", unFlipCal);

	}

	let rightBtn = document.createElement("div");
	rightBtn.className = "details-btn";

	if (type === "details") {
		rightBtn.id = "edit-btn";
		rightBtn.innerText = "edit";
		rightBtn.removeEventListener("click", saveDetails);
		rightBtn.addEventListener("click", selectDetails);
	} else {
		// leftBtn.classList.add("hide-btn");
		rightBtn.id = "save-btn";
		rightBtn.innerText = "save";
		rightBtn.removeEventListener("click", selectDetails);
		rightBtn.addEventListener("click", saveDetails);
	}

	headerDiv.appendChild(leftBtn);
	headerDiv.appendChild(dateTitle);
	headerDiv.appendChild(rightBtn);
	detailsEl.appendChild(headerDiv);
}
const createDetails = (type) => {
	let detailsDiv = document.createElement("div");
	detailsDiv.id = type;
	detailsDiv.className = "details-body";

	refreshData();
	let sectionIndex = sections.findIndex((el) => el === type);
	let detailsData = dataOpen[sectionIndex].split(",");
	console.log("detailsData:", detailsData);
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