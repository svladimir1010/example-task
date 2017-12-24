var add = document.getElementById("add");
add.addEventListener("click", function(e) {
	var text = document.getElementById("new").value;
	var task = new Task(text);

	document.querySelector(".list").appendChild(task.el());
});
//первое у нас есть сущность - таска

//const Task = (text) => this.text = text;

function Task(text) {
	this.text = text;
	this.isDone = false; //добавл состояние - не сделана таска
}

Task.prototype.done = function() {
	this.isDone = !this.isDone;
	console.log("this", this);
};

Task.prototype.el = function() {
	var el = document.createElement("li");
	el.innerText = this.text;

	var done = document.createElement("button");
	done.innerText = "done";
	done.classList.add("done");

	// done.addEventListener('click', this.done.bind(this));
	var self = this;
	done.addEventListener("click", function() {
		self.done();
		el.classList.toggle("passed");
	});

	var remove = document.createElement("button");
	remove.innerText = "remove";
	remove.classList.add("remove");

	remove.addEventListener("click", function() {
		el.remove();
	});

	el.appendChild(done);
	el.appendChild(remove);

	return el;
};
