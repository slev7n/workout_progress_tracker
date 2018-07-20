function Workout(obj, parent) {
	obj = obj || {created_on: new Date().getTime, sets: [55,96,85], title: 'Workout', status: ''};
	parent = parent || document.body;

	let root = this;

	let setCount = 0;

	let wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'workout');

	let title = document.createElement('div');
		title.setAttribute('contenteditable', 'true');
		title.setAttribute('class', 'title');
		title.innerText = obj.title;

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
			set.setAttribute('class', 'sets');
			set.innerText = ++setCount;
		let reps = document.createElement('input');
			reps.setAttribute('type', 'number');
			reps.setAttribute('value', typeof repCount == 'number' ? repCount : 0);
			reps.setAttribute('class', 'reps');
			reps.addEventListener('keypress', function(e) {
				if(e.keyCode == 13)
					root.addSet();
			});

		setDiv.appendChild(set);
		setDiv.appendChild(reps);
		wrapper.appendChild(setDiv);
		if(repCount == undefined || typeof repCount == 'object')
			reps.select();
	}
		
		addSetBtn.addEventListener('click', this.addSet);

	this.getTotal = function() {
		return [].slice.call(wrapper.querySelectorAll('.reps')).reduce(function(a, b) {
			return a + parseInt(b.value);
		}, 0);
	}

	wrapper.appendChild(title);
	wrapper.appendChild(total);
	wrapper.appendChild(addSetBtn);
	parent.insertBefore(wrapper, parent.firstChildElement);

	this.saveStorage = function() {
		
	}

	if(obj.sets.length > 0) {
		obj.sets.forEach(el => this.addSet(el));
	} else {
		this.addSet();
	}
}

let workout = new Workout();