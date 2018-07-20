function Workout(obj, parent) {
	obj = obj || {created_on: new Date().getTime(), sets: [55,66,55], title: 'Workout', status: ''};
	parent = parent || document.body;

	let root = this;

	let setCount = 0;

	let wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'workout');

	let title = document.createElement('div');
		title.setAttribute('contenteditable', 'true');
		title.setAttribute('class', 'title');
		title.innerText = obj.title;
		title.addEventListener('blur', function() {
			obj.title = this.innerText;
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
				root.setTotal();
				obj.sets[[].slice.call(setBox.children).indexOf(this.parentElement)] = parseInt(this.value);
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
			reps.select();
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

	wrapper.appendChild(title);
	wrapper.appendChild(total);
	wrapper.appendChild(addSetBtn);
	wrapper.appendChild(setBox);
	parent.appendChild(wrapper);

	this.json = function() {
		return obj;
	}

	if(obj.sets.length > 0) {
		obj.sets.forEach(el => this.addSet(el));
		this.setTotal();
	} else {
		this.addSet();
	}
}

let workout = new Workout();