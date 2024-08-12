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

const moodsConv = {
	1: "amazing",
	2: "good",
	3: "ok",
	4: "bad",
	5: "horrible"
}

const selectDetails = () => {
	// console.log("selecting...");
	clearDetails();
}

const showDetails = (dataOpen) => {
	createDetailsHeader(dataOpen);
	createDetailsMood(dataOpen);
	createDetails(dataOpen, "activities");
	createDetails(dataOpen, "weather");
}

const clearDetails = () => {
	detailsEl.innerHTML = "";
}

const createDetailsHeader = (dataOpen) => {
	let headerDiv = document.createElement("div");
	headerDiv.className = "header";

	let dateTitle = document.createElement("h1");
	dateTitle.className = "date-open";
	dateTitle.innerText = `${monthsConv[Number(monthOpen)]} ${dateOpen}, ${yearOpen}`;

	let backBtn = document.createElement("div");
	backBtn.className = "details-btn";
	backBtn.id = "back-btn";
	backBtn.innerText = "back"; // replace with back arrow later?
	backBtn.addEventListener("click", () => {
		unFlipCal();
		setTimeout(clearDetails, 1000); // wait for animation to finish to clear details
	});

	let editBtn = document.createElement("div");
	editBtn.className = "details-btn";
	editBtn.id = "edit-btn";
	editBtn.innerText = "edit";
	editBtn.addEventListener("click", selectDetails);

	headerDiv.appendChild(backBtn);
	headerDiv.appendChild(dateTitle);
	headerDiv.appendChild(editBtn);
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