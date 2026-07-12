const today = new Date();
document.getElementById("date").innerHTML =
  today.toDateString();
let todos = localStorage.getItem("TODO")? JSON.parse(localStorage.getItem("TODO")):[];
let savetodos=()=>{
     localStorage.setItem("TODO",JSON.stringify(todos));
}
let inp = document.querySelector("input");
console.log("new task", { value:inp.value });
let btn = document.getElementById("add");
let ul = document.querySelector("ul");
function renderTodo(todo) {
    let item = document.createElement("span");
    item.innerText = todo.text;
    item.classList.add("value");

    let div = document.createElement("div");
    div.classList.add("task");
    div.dataset.id = todo.id;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = todo.completed;

    if (todo.completed) {
        item.classList.add("completed");
    }

    let delbtn = document.createElement("button");
    delbtn.innerText = "Delete";
    delbtn.classList.add("delete");

    let editbtn = document.createElement("a");
    editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editbtn.classList.add("editbtn");

    div.appendChild(checkbox);
    div.appendChild(item);
    div.appendChild(editbtn);
    div.appendChild(delbtn);

    ul.appendChild(div);

    checkbox.addEventListener("click", function () {
        item.classList.toggle("completed");

        todo.completed = checkbox.checked;
        savetodos();
        updateProgress();
        updateUi();
        taskscompleted();
    });


    delbtn.addEventListener("click", function () {
        todos = todos.filter(task => task.id !== todo.id);
        div.remove();
        savetodos();
        updateProgress();
        updateUi();
        taskscompleted();
    });

    editbtn.addEventListener("click", function () {
        if (this.classList.contains("editing")) {
            delbtn.style.display="block";
            const input = div.querySelector(".edit-input");
            todo.text = input.value;
             if (input.value.trim() === "") {
        alert("You entered an invalid task");
        return;
    }

       else{   
        item.innerText = todo.text;
         this.innerHTML = '<i class="fa-solid fa-pen"></i>';
        this.classList.remove("editing");
         savetodos();
        }
    } else {
            item.innerHTML =
                `<input type="text" value="${todo.text}" class="edit-input">`;
             
            this.textContent = "Save";
             delbtn.style.display="none";
            this.classList.add("editing");

        }
    });
}
todos.forEach(todo => {
    renderTodo(todo);
});
updateProgress();
updateUi();
taskscompleted();
    function taskscompleted(){
         let progress = document.querySelector(".progress-container"); 
           let emptystate=document.querySelector(".emptystate");
         let progtext= document.querySelector(".progress-text");
        const allCompleted = todos.every(todo => todo.completed)&& todos.length>0;
         const completedMessage =
        document.querySelector(".completed-message");
        if(todos.length ===0){
            completedMessage.style.display="none";
        }
         if (allCompleted) {
         setTimeout(() => {        
          ul.innerHTML = "";  
            completedMessage.style.display = "block";
            emptystate.style.display = "none";
            progress.style.display = "none";
            progtext.style.display = "none";
              todos = []; 
           savetodos();  
           
        }, 2000);

        
    } else {
        completedMessage.style.display = "none";
       
    }
    } 


function updateProgress() {
    const totalTasks = todos.length;

    const completedTasks =
        todos.filter(todo => todo.completed).length;

    const progress =
        totalTasks === 0
            ? 0
            : (completedTasks / totalTasks) * 100;

    document.getElementById("progress-bar").style.width =
        `${progress}%`;

    document.querySelector(".progress-text").innerText =
        `${Math.round(progress)}% Complete`;
        document.querySelector(".progress-text").innerText =
    `${completedTasks}/${totalTasks} Tasks Completed`;
    
}
function updateUi(){
     let emptystate=document.querySelector(".emptystate");
      let maincontent= document.querySelector(".maincontent");
       let progress = document.querySelector(".progress-container"); 
       let progtext= document.querySelector(".progress-text");
       if(todos.length ===0){ 
        emptystate.style.display="block";
         let lines = document.querySelectorAll(".line");
          lines.forEach(line => 
            { line.style.display = "none"; progress.style.display="none"; }); } 
            else{
                 emptystate.style.display="none";
                 progress.style.display="block";
                 progtext.style.display="block";
                 } }
btn.addEventListener("click", function () {

    if (inp.value.trim() === "") {
        alert("You entered an invalid task");
        return;
    }

    let todo = {
        id: crypto.randomUUID(),
        text: inp.value.trim(),
        completed: false
    };
    todos.push(todo);
    savetodos();
    renderTodo(todo);
    updateProgress();
    updateUi();
    taskscompleted();
    inp.value = "";
});


 
let pages = document.querySelectorAll(".pages");

for (let page of pages) {
    page.addEventListener("click", function (event) {
        event.preventDefault();

        const filter = event.target.innerText.toLowerCase();

        const tasks = document.querySelectorAll(".task");

        tasks.forEach(taskDiv => {
            const taskId = taskDiv.dataset.id;

            const todo = todos.find(todo => todo.id === taskId);

            if (filter === "all") {
                taskDiv.style.display = "flex";
            }
            else if (filter === "active") {
                taskDiv.style.display =
                    !todo.completed ? "flex" : "none";
            }
            else if (filter === "completed") {
                taskDiv.style.display =
                    todo.completed ? "flex" : "none";
            }
        });
    });}
