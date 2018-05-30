

function Workout(parent) {
	let parentEl = parent || document.body;
	let setCount = 1;

	let wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'workout');

	let title = document.createElement('div');
		title.setAttribute('contenteditable', 'true');;
		title.setAttribute('class', 'title');

	let total = document.createElement('div');
		total.setAttribute('class', 'total');
		total.innerText = 0;

	let addSet = document.createElement('button');
		addSet.setAttribute('class', 'add-set');
		addSet.innerText = '+';

	let storage = {
		set: function() {
			let arr = [];
			let obj = {};
				obj.title = '';
				obj.reps = [];
			document.querySelectorAll('.workout').forEach(function(workout) {
				obj.title = workout.querySelector('.title').innerText;
				workout.querySelectorAll('.reps').forEach(function(rep) {
					obj.reps.unshift(parseInt(rep.value));
				});
				arr.unshift(obj);
				localStorage['workout'] = JSON.stringify(arr);
			});
		},
		get: function() {
			return JSON.parse(localStorage['workout']);
		}
	}

	let makeTotal = function() {
		let totalCount = 0;
		let obj_arr = [];
		this.parentElement.querySelectorAll('.reps').forEach(function(el) {
			let value = parseInt(el.value);
			if(Number.isInteger(value)) {
				totalCount += value;
				obj_arr.unshift({reps: value});
			}
		});
		this.parentElement.querySelector('.total').innerText = totalCount;
		storage.set();
	}

	let generate = function() {
		let set = document.createElement('div');
			set.setAttribute('class', 'sets');
			set.innerText = setCount++;

		let rep = document.createElement('input');
			rep.setAttribute('type', 'text');
			rep.setAttribute('class', 'reps');
			rep.addEventListener('keyup', makeTotal);
		this.parentElement.insertBefore(rep, this.nextElementSibling);
		this.parentElement.insertBefore(set, rep);
	}

	wrapper.appendChild(title);
	wrapper.appendChild(total);
	wrapper.appendChild(addSet);
	parentEl.appendChild(wrapper);

	try {
		let arr = JSON.parse(localStorage['workout']);

	} catch(e) {
		console.log(e.message);
		generate.call(addSet);
		addSet.addEventListener('click', generate);
	}
}

new Workout();
new Workout();
new Workout();









