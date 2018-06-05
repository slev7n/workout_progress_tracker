

function Workout(parent) {
	let root = this;
	let parentEl = parent || document.body;
	let setCount = 1;

	let workout = document.createElement('div');
		workout.setAttribute('class', 'workout');

	this.setTitle = function(newTitle) {
		title.innerText = newTitle;
	}

	this.getTitle = function() {
		return title.innerText;
	}

	let setRep = document.createElement('div');
	setRep.setAttribute('class', 'set-rep');

	let title = document.createElement('div');
		title.setAttribute('contenteditable', 'true');
		title.setAttribute('placeholder', 'Workout Title');
		title.setAttribute('class', 'title');

	let total = document.createElement('div');
		total.setAttribute('class', 'total');
	this.getTotal = function() {
		let totalCount = 0;
		[].slice.call(setRep.querySelectorAll('.reps')).forEach(function(rep) {
			if(rep.value && Number.isInteger(parseInt(rep.value))) {
				totalCount += parseInt(rep.value);

			}
		});
		return totalCount;
	}

	this.setTotal = function() {
		total.innerText = this.getTotal();
	}

	this.removeSets = function() {
		[].slice.call(setRep.children).forEach(el => el.parentElement.removeChild(el));
	}

	this.addSet = function(setsArray) {
		if(setsArray && !setsArray.target) {
			this.removeSets();
			setsArray.forEach(function(el, i) {
				let set = document.createElement('div');
					set.setAttribute('class', 'sets');
					set.innerText = i + 1;
				let rep = document.createElement('input');
					rep.setAttribute('type', 'text');
					rep.setAttribute('class', 'reps');
					rep.value = el;
				setRep.insertBefore(set, setRep.children[0]);
				setRep.insertBefore(rep, set);
				root.setTotal();
			});
		} else {
			let set = document.createElement('div');
				set.setAttribute('class', 'sets');
				set.innerText = setCount++;

			let rep = document.createElement('input');
				rep.setAttribute('type', 'text');
				rep.setAttribute('class', 'reps');
				rep.addEventListener('keyup', this.setTotal.bind(this));
				rep.addEventListener('focus', function() {
					this.select();
				});
				rep.value = 0;
				setRep.insertBefore(set, setRep.children[0]);
				setRep.insertBefore(rep, set);
		}
	}

	let addSetBtn = document.createElement('button');
		addSetBtn.setAttribute('class', 'add-set');
		addSetBtn.innerText = '+';
		addSetBtn.addEventListener('click', this.addSet.bind(this));

	parentEl.appendChild(workout);
	workout.appendChild(title);
	workout.appendChild(total);
	workout.appendChild(addSetBtn);
	workout.appendChild(setRep);

	this.addSet();
	this.setTotal();
}

new Workout();
new Workout();
new Workout();









