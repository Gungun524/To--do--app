let del = document.querySelectorAll(".delete")
let btn = document.querySelector("button");
let inp = document.querySelector("input");
let ul = document.querySelector("ul");
btn.addEventListener("click", function(){
    console.log(inp.value);
    let item = document.createElement("li");
    item.innerText = inp.value;
    ul.appendChild(item);
    let delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerText = "Delete Task";
    item.appendChild(delBtn);
    
    inp.value ="";
});
let delbtns = document.querySelectorAll(".delete");
for(delbtn of delbtns){
    delbtn.addEventListener("click",function(){
        let par = delbtn.parentElement;
        par.remove();

    })
}
