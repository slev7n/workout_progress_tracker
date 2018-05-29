let addSet = document.querySelector('#addSet');
let totalsDiv = document.querySelector('#total');
init();


function init() {
	try {
		let arr = JSON.parse(localStorage['workout']);
		this.setCount = 1;
		for(let el of arr) {
			generate.call(addSet, el.reps);
		}
		totalsDiv.innerText = arr.reduce(function(a,b) {
			a += parseInt(b.reps);
			return a;
		}, 0);
		this.setCount = arr.length;
	} catch(e) {
		console.log(e.message);
		this.setCount = 1;
		generate.call(addSet);
	}
}


document.querySelector('.reps').addEventListener('keyup', makeTotal);

function makeTotal() {
	let total = 0;
	let obj_arr = [];
	document.querySelectorAll('.reps').forEach(function(el) {
		let value = parseInt(el.value);
		if(Number.isInteger(value)) {
			total += value;
			obj_arr.unshift({reps: value});
		}
	});
	totalsDiv.innerText = total;
	localStorage['workout'] = JSON.stringify(obj_arr);
}

function generate(repValue) {
	let set = document.createElement('input');
		set.setAttribute('type', 'text');
		set.setAttribute('disabled', 'true');
		set.setAttribute('class', 'sets');
		set.setAttribute('placeholder', setCount++);
	let rep = document.createElement('input');
		rep.setAttribute('type', 'text');
		rep.setAttribute('class', 'reps');
		rep.addEventListener('keyup', makeTotal);
		if(repValue && !repValue.target)
			rep.setAttribute('value', repValue)
	this.parentElement.insertBefore(rep, this.nextElementSibling);
	this.parentElement.insertBefore(set, rep);
}

addSet.addEventListener('click', generate);
