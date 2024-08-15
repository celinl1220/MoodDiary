const selectDetails = () => {
	clearDetails();
	createDetailsHeader("edit");
	sections.forEach((sect) => createEdit(sect));
}

const saveDetails = () => {
	let dataArr = [];
	sections.forEach((sect) => {
		const sectArr = saveType(sect);
		dataArr.push(sectArr);
		localStorage.setItem(`mood-diary-user-data-${yearOpen}${monthOpen}${dateOpen}-${sect}`, sectArr);
	});

	// console.log(`${yearOpen}${monthOpen}${dateOpen}: ${dataArr}`);

	unFlipCal();
}

const saveType = (type) => {
	// console.log(`saving ${type}...`);
	const sel = document.querySelectorAll(`.${type}.selected`);
	let arr = [];
	sel.forEach((el) => {
		arr.push(el.id);
	});
	return arr;
}

const selectEl = (el) => {
	el.classList.toggle("selected");
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
	let sectionIndex = sections.findIndex((el) => el === type);
	refreshData();
	let detailsData = dataOpen[sectionIndex].split(",");
	editData = options[sectionIndex];
	editData.forEach((el) => {
		let element = document.createElement("span");
		element.classList.add(type);
		element.id = el;
		element.innerText = el;
		element.addEventListener("click", (e) => {
			selectEl(e.target)
		});
		editContent.appendChild(element);
		if (detailsData.includes(el)) {
			selectEl(element);
		}
	});

	editDiv.appendChild(editHeader);
	editDiv.appendChild(editContent);
	detailsEl.appendChild(editDiv);
}