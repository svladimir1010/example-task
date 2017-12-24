function Task(text, isDone) {
	this.text = text;
	this.isDone = isDone || false; //добавл состояние - не сделана таска
}

Task.prototype.done = function() {
	this.isDone = !this.isDone;
	//console.log("this", this);
	
};

Task.prototype.el = function(n) {
	var el = document.createElement("li");
	el.innerText = this.text;

	var done = document.createElement("button");
	done.innerText = "done";
	//done.classList.add("done");

	// done.addEventListener('click', this.done.bind(this));
	var self = this;
	done.addEventListener("click", function() {
		self.done();
		el.classList.toggle("passed");
		arrTasks.save();
	});

	var remove = document.createElement("button");
	remove.innerText = "remove";
	//remove.classList.add("remove");

	remove.addEventListener("click", function() {
		el.remove();
		delete arrTasks[n]
		arrTasks.save();
	});

	el.appendChild(done);
	el.appendChild(remove);

	return el;
};
// ==================================================
function List() {

}
List.prototype = [];

List.prototype.save = function() {
	localStorage.myApp = JSON.stringify(this);
}

var arrTasks = new List();
//проверка localStore
if(localStorage.myApp) {
	var lastTasks = JSON.parse(localStorage.myApp)
	delete lastTasks.length;
	for(var i in lastTasks) {
		lastTasks[i];
		var task = new Task(lastTasks[i].text, lastTasks[i].isDone)
		var num = arrTasks.push(task) - 1;
		document.querySelector(".list").appendChild(task.el(num));
	}
}

var add = document.getElementById("add");
add.addEventListener("click", function(e) {
	var text = document.getElementById("new").value;
		var task = new Task(text);

		var num = arrTasks.push(task) - 1;
	
	// ======================================================
// добавляем обработчик через делегирование

	// var el = document.createElement("li");
	// el.innerHTML = text + "<button class='done'>done</button><button class='remove'>remove</button>";
 //    var list = document.querySelector(".list");
	// list.appendChild(el);

	// list.addEventListener("click", function({target}) {
	// 	(target.classList.contains("done")) ? target.parentNode.classList.toggle("passed") : '';
	// 	(target.classList.contains("remove")) ? target.parentNode.remove() : '';
	// });
	// ======================================================
	document.querySelector(".list").appendChild(task.el(num));
	arrTasks.save();
});
//первое у нас есть сущность - таска

//const Task = (text) => this.text = text;


