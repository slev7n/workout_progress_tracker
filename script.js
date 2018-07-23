localStorage['WorkoutApp'] = localStorage['WorkoutApp'] || JSON.stringify([]);

let foo = JSON.parse(localStorage['WorkoutApp']).filter(el => el.status !== 'done');

if(foo.length > 0)
	foo.forEach(el => new Workout(el, document.getElementById('wrapper')));
else
	new Workout(false, document.getElementById('wrapper'));

function Workout(obj, parent) {
	obj = obj || {created_on: new Date().getTime(), sets: [], title: 'Workout', status: ''};
	parent = parent || document.body;

	let root = this;

	let setCount = 0;

	let wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'workout');

	let settings = document.createElement('div');
		settings.setAttribute('class', 'settings');

	let title = document.createElement('input');
		title.setAttribute('type', 'text');
		title.setAttribute('class', 'title');
		title.value = obj.title;
		title.addEventListener('blur', function() {
			if(obj.title !== this.value) {
				obj.title = this.value;
				root.localSave();
			}
		});
		title.addEventListener('focus', function() {
			this.select();
		});
		title.addEventListener('keypress', function(e) {
			if(e.keyCode == 13)
				this.blur();
		});

	let setBox = document.createElement('div');
		setBox.setAttribute('class', 'sets');

	this.setTitle = function(str) {
		title.innerText = str;
	}

	this.getTitle = function() {
		return title.innerText;
	}

	let total = document.createElement('div');
		total.setAttribute('class', 'total');
		total.innerText = 0;

	let addSetBtn = document.createElement('button');
		addSetBtn.setAttribute('class', 'add-set');
		addSetBtn.innerText = '+';

	this.addSet = function(repCount) {
		let setDiv = document.createElement('div');
			setDiv.setAttribute('class', 'set');
		let set = document.createElement('div');
			set.setAttribute('class', 'count');
			set.innerText = ++setCount;
		let reps = document.createElement('input');
			reps.setAttribute('type', 'number');
			reps.setAttribute('value', typeof repCount == 'number' ? repCount : 0);
			reps.setAttribute('class', 'reps');
			reps.addEventListener('blur', function() {
				if(obj.sets[[].slice.call(setBox.children).indexOf(this.parentElement)] !== parseInt(this.value)) {
					root.setTotal();
					obj.sets[[].slice.call(setBox.children).indexOf(this.parentElement)] = parseInt(this.value);
					root.localSave();
				}
			});
			reps.addEventListener('focus', function() {
				this.select();
			});
			reps.addEventListener('keypress', function(e) {
				if(e.keyCode == 13)
					root.addSet();
			});

		setDiv.appendChild(set);
		setDiv.appendChild(reps);
		setBox.appendChild(setDiv);
		if(repCount == undefined || typeof repCount == 'object')
			reps.focus();
	}
		
		addSetBtn.addEventListener('click', this.addSet);

	this.getTotal = function() {
		return [].slice.call(wrapper.querySelectorAll('.reps')).reduce(function(a, b) {
			return a + parseInt(b.value);
		}, 0);
	}

	this.setTotal = function() {
		total.innerText = this.getTotal();
	}

	this.done = function() {
		obj.status = 'done';
	}

	wrapper.appendChild(settings);
	wrapper.appendChild(title);
	wrapper.appendChild(total);
	wrapper.appendChild(addSetBtn);
	wrapper.appendChild(setBox);
	parent.appendChild(wrapper);

	this.localSave = function() {
		let storage_arr = JSON.parse(localStorage['WorkoutApp']);
		let workout_arr = storage_arr.filter(el => el.created_on == obj.created_on) || [];
		if(workout_arr.length > 0) {
			storage_arr.splice(storage_arr.indexOf(workout_arr[0]), 1, obj);
		} else {
			storage_arr.push(obj);
		}
		if(localStorage['WorkoutApp'] = JSON.stringify(storage_arr))
			console.log('Saved locally!')
	}

	this.remoteSave = function() {

	}

	if(obj.sets.length > 0) {
		obj.sets.forEach(el => this.addSet(el));
		this.setTotal();
	} else {
		this.addSet();
	}
	console.log(obj);
}