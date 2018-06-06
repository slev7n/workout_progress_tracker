

function Workout(parent) {
	let root = this;
	let parentEl = parent || document.body;
	localStorage['workout'] = localStorage['workout'] || '[]';
	let setCount = 1;

	let workout = document.createElement('div');
		workout.setAttribute('class', 'workout');

	let setRep = document.createElement('div');
		setRep.setAttribute('class', 'set-rep');

	let title = document.createElement('div');
		title.setAttribute('contenteditable', 'true');
		title.setAttribute('placeholder', 'Workout Title');
		title.setAttribute('class', 'title');
		title.addEventListener('blur', function() {
			root.storage.get(function(data) {
				data[data.indexOf(root)].setTitle(this.innerText);
				this.set(data);
			});
		});


	let total = document.createElement('div');
		total.setAttribute('class', 'total');

	let addSetBtn = document.createElement('button');
		addSetBtn.setAttribute('class', 'add-set');
		addSetBtn.innerText = '+';

	this.storage = {};

	this.storage.set = function(data) {
		localStorage['workout'] = JSON.stringify(data);
	}

	this.storage.get = function(fn) {
		fn(JSON.parse(localStorage['workout']));
	}

	this.storage.get(function(data) {
		if(data.indexOf(root) < 0) {
			data.push(root);
			root.storage.set(data);
		}
	});

	this.setTitle = function(newTitle) {
		title.innerText = newTitle;
	}

	this.getTitle = function() {
		return title.innerText;
	}
	this.getTotalReps = function() {
		let totalCount = 0;
		[].slice.call(setRep.querySelectorAll('.reps')).forEach(function(rep) {
			if(rep.value && Number.isInteger(parseInt(rep.value))) {
				totalCount += parseInt(rep.value);

			}
		});
		return totalCount;
	}

	this.setTotalReps = function() {
		total.innerText = this.getTotalReps();
	}

	this.getTotalSets = function() {
		return setRep.querySelectorAll('.reps').length;
	}

	this.getAverage = function() {
		return parseInt(this.getTotalReps()) / parseInt(this.getTotalSets());
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
				root.setTotalReps();
			});
		} else {
			let set = document.createElement('div');
				set.setAttribute('class', 'sets');
				set.innerText = setCount++;

			let rep = document.createElement('input');
				rep.setAttribute('type', 'text');
				rep.setAttribute('class', 'reps');
				rep.addEventListener('keyup', this.setTotalReps.bind(this));
				rep.addEventListener('keyup', function(e) {
					if(e.keyCode == 13)
						root.addSet();
				});
				rep.addEventListener('focus', function() {
					this.select();
				});
				rep.value = 0;
				setRep.insertBefore(set, setRep.children[0]);
				setRep.insertBefore(rep, set);
				rep.focus();
		}
	}

	addSetBtn.addEventListener('click', this.addSet.bind(this));

	parentEl.appendChild(workout);
	workout.appendChild(title);
	workout.appendChild(total);
	workout.appendChild(addSetBtn);
	workout.appendChild(setRep);

	this.addSet();
	this.setTotalReps();
}

document.querySelector('#addWorkout').addEventListener('click', function(e) {
	new Workout(document.getElementById('container'));
});

new Workout(document.getElementById('container'));








