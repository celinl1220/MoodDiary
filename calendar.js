!function() {

	var today = moment();

	function Calendar(selector) {
		this.el = document.querySelector(selector);
		this.current = moment().date(1);
		this.draw();
	}

	Calendar.prototype.draw = function() {
		//Create Header
		this.drawHeader();

		//Draw Month
		this.drawMonth();
	}

	Calendar.prototype.drawHeader = function() {
		var self = this;
		if(!this.header) {
		  //Create the header elements
		  this.header = createElement('div', 'header');
		  this.header.className = 'header';

		  this.title = createElement('h1');

		  var right = createElement('div', 'right');
		  right.addEventListener('click', function() { self.nextMonth(); });

		  var left = createElement('div', 'left');
		  left.addEventListener('click', function() { self.prevMonth(); });

		  //Append the Elements
		  this.header.appendChild(this.title); 
		  this.header.appendChild(right);
		  this.header.appendChild(left);
		  this.el.appendChild(this.header);
		}

		this.title.innerHTML = this.current.format('MMMM YYYY').toLowerCase();
	}

	Calendar.prototype.drawMonth = function() {
		var self = this;

		if(this.month) {
		  this.oldMonth = this.month;
		  this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
		  this.oldMonth.addEventListener('webkitAnimationEnd', function() {
		    self.oldMonth.parentNode.removeChild(self.oldMonth);
		    self.month = createElement('div', 'month');
		    self.backFill();
		    self.currentMonth();
		    self.fowardFill();
		    self.el.appendChild(self.month);
		    window.setTimeout(function() {
		      self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
		    }, 16);
		  });
		} else {
		    this.month = createElement('div', 'month');
		    this.el.appendChild(this.month);
		    this.backFill();
		    this.currentMonth();
		    this.fowardFill();
		    this.month.className = 'month new';
		}
	}

	Calendar.prototype.backFill = function() {
		var clone = this.current.clone();
		var dayOfWeek = clone.day();

		if(!dayOfWeek) { return; }

		clone.subtract(dayOfWeek+1, 'days');

		for(var i = dayOfWeek; i > 0 ; i--) {
			this.drawDay(clone.add(1, 'days'));
		}
	}

	Calendar.prototype.fowardFill = function() {
		var clone = this.current.clone().add(1, 'months').subtract(1, 'days');
		var dayOfWeek = clone.day();

		if(dayOfWeek === 6) { return; }

		for(var i = dayOfWeek; i < 6 ; i++) {
			this.drawDay(clone.add(1, 'days'));
		}
	}

	Calendar.prototype.currentMonth = function() {
		var clone = this.current.clone();

		while(clone.month() === this.current.month()) {
			this.drawDay(clone);
			clone.add(1, 'days');
		}
	}

	Calendar.prototype.getWeek = function(day) {
		if(!this.week || day.day() === 0) {
			this.week = createElement('div', 'week');
			this.month.appendChild(this.week);
		}
	}

	Calendar.prototype.drawDay = function(day) {
		var self = this;
		this.getWeek(day);

		//Outer Day
		var outer = createElement('div', this.getDayClass(day));
		outer.addEventListener('click', function() {
		  self.openDay(this);
		});

		//Day Name
		var name = createElement('div', 'day-name', day.format('ddd'));

		//Day Number
		var number = createElement('div', 'day-number', day.format('DD'));

		outer.appendChild(name);
		outer.appendChild(number);
		this.week.appendChild(outer);
	}

	Calendar.prototype.getDayClass = function(day) {
		classes = ['day'];
		if(day.month() !== this.current.month()) {
			classes.push('other');
			if(day.month() === this.current.month()-1) {
				classes.push('prev');
			} else if(day.month() === this.current.month()+1) {
				classes.push('next');
			}
		} else if (today.isSame(day, 'day')) {
			classes.push('today');
		}
		return classes.join(' ');
	}

	Calendar.prototype.openDay = function(el) {
		let curDate = this.current.clone();
		dateOpen = "0" + el.querySelector(".day-number").innerText;
		dateOpen = dateOpen.slice(-2);
		if (el.classList.contains("prev")) {
			monthOpen = "0" + curDate.month();
		} else if (el.classList.contains("next")) {
			monthOpen = "0" + (curDate.month() + 2);
		} else {
			monthOpen = "0" + (curDate.month() + 1);
		}
		monthOpen = monthOpen.slice(-2);
		yearOpen = curDate.year();

		flipCal();
	}

	Calendar.prototype.nextMonth = function() {
		this.current.add(1, 'months');
		this.next = true;
		this.draw();
	}

	Calendar.prototype.prevMonth = function() {
		this.current.subtract(1, 'months');
		this.next = false;
		this.draw();
	}

	window.Calendar = Calendar;

	function createElement(tagName, className, innerText) {
		var ele = document.createElement(tagName);
		if(className) {
			ele.className = className;
		}
		if(innerText) {
			ele.innerText = ele.textContent = innerText;
		}
		return ele;
	}
}();

!function() {

	var calendar = new Calendar('#calendar');

}();