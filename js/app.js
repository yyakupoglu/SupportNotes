//
//Cards
var todo_card = document.getElementById("to-do-card");
var done_card = document.getElementById("done-card");
//Input Text Bars
var todo_input = document.getElementById("to-do-input");
var done_input = document.getElementById("done-input");
var todo_counter = 0;
var done_counter = 0;



todo_card.addEventListener("click",function(event){
	if(event.target.type == 'checkbox'){
		done_card.appendChild(event.target.parentElement);
		// console.log(event.target.parentElement);
	}
});

done_card.addEventListener("click",function(event){
	if(event.target.type == 'checkbox'){
		todo_card.appendChild(event.target.parentElement);
		// console.log(event.target.parentElement);
	}
});

document.getElementById("to-do-button").addEventListener("click", function(){
	if (todo_input.value != "" | null){
		let todo_p = document.createElement("p");
		todo_p.id = "to-do-input-" + todo_counter;
		todo_counter++;
		todo_p.className="todop float-left userin";
		todo_card.appendChild(todo_p);
		let todo_checkbox = document.createElement("input");
		todo_checkbox.className="checkbox-design float-left"; 
		todo_checkbox.type="checkbox";
		//todo_checkbox.addEventListener("click",checkboxCallback());
		todo_p.appendChild(todo_checkbox);
		todo_p.appendChild(document.createTextNode(todo_input.value));
		console.log(todo_p);
		todo_input.value="";
	}
	
});

document.getElementById("done-button").addEventListener("click", function(){
	if (done_input.value != "" | null){
		let done_p = document.createElement("p");
		done_p.id = "done-input-" + done_counter;
		done_counter++;
		done_p.className="donep float-left userin ";
		done_card.appendChild(done_p);
		let done_checkbox = document.createElement("input");
		done_checkbox.className="checkbox-design float-left"; 
		done_checkbox.type="checkbox";
		done_checkbox.checked=true;
		//todo_checkbox.addEventListener("click",checkboxCallback());
		done_p.appendChild(done_checkbox);
		done_p.appendChild(document.createTextNode(done_input.value));
		console.log(done_p);
		done_input.value="";
	}
	
});
todo_input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("to-do-button").click();
  }
});

done_input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("done-button").click();
  }
});