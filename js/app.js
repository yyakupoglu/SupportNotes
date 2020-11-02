//
//Cards
const todo_card = document.getElementById("to-do-card");
const done_card = document.getElementById("done-card");
console.log(todo_card);
//Input Text Bars
const todo_input = document.getElementById("to-do-input");
const done_input = document.getElementById("done-input");
//Buttons 
const todo_button = document.getElementById("to-do-button");
const done_button = document.getElementById("done-button");
var todo_counter, todo_checkbox_counter = 0;
var done_counter, done_checkbox_counter = 0;


eventListeners();

function eventListeners(){
	document.addEventListener("DOMContentLoaded", loadAllToUI);

	todo_button.addEventListener("click", function(){
		if (todo_input.value != "" | null | undefined){
			addNoteToCard(todo_input.value.trim(),0,1);
		}

	});

	done_button.addEventListener("click", function(){
		if (done_input.value != "" | null | undefined){
			addNoteToCard(done_input.value.trim(),1,1);
		}

	});
	todo_input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			todo_button.click();
		}
	});

	done_input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			done_button.click();
		}
	});

	todo_card.addEventListener("click",function(event){
		console.log(event.target.group);
		if(event.target.group == 'checkbox'){
			deleteItemFromStorage("todos",event.target.parentElement.textContent);
			addItemToStorage("dones",event.target.parentElement.textContent);
			done_card.lastElementChild.appendChild(event.target.parentElement);
		} else if (event.target.group == 'removebox'){
			deleteItemFromStorage("todos",event.target.parentElement.textContent);
			event.target.parentElement.remove();
		}
	});

	done_card.addEventListener("click",function(event){
		if(event.target.group == 'checkbox'){
			deleteItemFromStorage("dones",event.target.parentElement.textContent);
			addItemToStorage("todos",event.target.parentElement.textContent);
			todo_card.lastElementChild.appendChild(event.target.parentElement);
		} else if (event.target.group == 'removebox'){
			deleteItemFromStorage("dones",event.target.parentElement.textContent);
			event.target.parentElement.remove();
		}
	});



}

function loadAllToUI(){
	//Get Elements from Local Storage	
	let todos = getStoredElements("todos");
	let dones = getStoredElements("dones");
	//Push them to UI pass 0 flag if todo, 1 if done
	todos.forEach(todo => addNoteToCard(todo,0,0));
	dones.forEach(done => addNoteToCard(done,1,0));
}

function getStoredElements(key){
	let items;
	if (localStorage.getItem(key) === null){
		items=[];
	} else {
		items=JSON.parse(localStorage.getItem(key));
	}
	return items;

}

function addItemToStorage(key, newItem){
	let items=getStoredElements(key);
	items.push(newItem);
	localStorage.setItem(key,JSON.stringify(items));
}

function addNoteToCard(item,num,isButton){
	if (num === 0){
		isButton && addItemToStorage("todos",item);
		addItemToDOM(item,todo_card.lastElementChild,num,todo_checkbox_counter);
		//Updating counter and resetting input
		todo_counter++;
		todo_checkbox_counter++;
		todo_input.value="";
	} else if (num === 1){
		isButton && addItemToStorage("dones",item);
		addItemToDOM(item,done_card.lastElementChild,num,done_checkbox_counter);
		//Updating counter and resetting input
		done_counter++;
		done_checkbox_counter++;
		done_input.value="";
	}
}


function deleteItemFromStorage(key,deleteItem){
	console.log(key, deleteItem)
	let items = getStoredElements(key);
	items.forEach((item,index)=>{
		if (item === deleteItem){
			items.splice(index,1);
		}
	});
	localStorage.setItem(key,JSON.stringify(items));
}

//Design of paragraph comes here
function addItemToDOM(item,parent,checked_flag,id_extension){
	let new_p = document.createElement("p");
	let new_label = document.createElement("LABEL");
	let new_checkbox = document.createElement("input");
	let new_removebox = document.createElement("input");

		//todo_p.id = "to-do-input-" + todo_counter;
		
		
		new_p.className="userin";
		
		new_checkbox.className="checkbox-design"; 
		new_checkbox.type="checkbox";
		new_checkbox.group="checkbox";
		new_checkbox.id=parent.id+"-"+id_extension;
		new_checkbox.checked=checked_flag;

		new_removebox.className="removebox-design float-right"
		new_removebox.type="checkbox";
		new_removebox.group="removebox";

		new_label.htmlFor = new_checkbox.id;

		parent.appendChild(new_p);
		new_p.appendChild(new_label);
		new_p.appendChild(new_checkbox);
		new_label.appendChild(document.createTextNode(item));
		new_p.appendChild(new_removebox);

	}