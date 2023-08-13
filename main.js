let taskArray = []
let newTask = document.getElementById("write-task")
let taskList = document.getElementById("task")
let message = document.getElementById("message")
let task = document.createElement("li")
let delTask = document.createElement("span")




//add new task function
function addTask() {
    if(newTask.value == ""){
        message.innerText = "*please write the task first"
    }
    else{
        // add task to the list
        task = document.createElement("li")
        task.innerText = newTask.value;
        taskList.appendChild(task)
        message.innerText = ""

        
        delTask = document.createElement("span")
        delTask.innerText = "\u00d7"
        task.appendChild(delTask)
  
        //add task to the array
        let taskObj={userTask: task , complete: false}
        console.log(taskObj.userTask);
        taskArray.push(taskObj)

    }
    newTask.value = ""
    localStorage.setItem("taskitem", taskList.innerHTML)
}




//modify task (checked/delete)
taskList.addEventListener("click", function (event) {
    if(event.target.tagName == "LI"){
        event.target.classList.toggle("complete") 
        localStorage.setItem("taskitem", taskList.innerHTML)  

        //modify the complete boolean value at the array
        let modifiedTask = taskArray.find(function(element) {
            return element.userTask.innerText == event.target.innerText
        })
        if(modifiedTask.userTask.innerText == event.target.innerText){
            modifiedTask.complete = true    
        }
        console.log(taskArray);
        
    }
    else if(event.target.tagName == "SPAN"){
        event.target.parentElement.remove()
        localStorage.setItem("taskitem", taskList.innerHTML)
        //remove the task from the array
        let modifiedTask = taskArray.find(function(element) {
            return element.userTask.innerText == event.target.parentElement.innerText
        })

        let index = taskArray.indexOf(modifiedTask)
        if(modifiedTask.userTask.innerText == event.target.parentElement.innerText){
            delete taskArray[index]  
        }
    }  
})

//display the local storage
function showTasks(){
    taskList.innerHTML = localStorage.getItem("taskitem");
}

showTasks()

//show all tasks
function showAll() {
    location.reload() 

}
//clear all tasks
function clearAll() {
    taskList.remove()
    localStorage.clear();    
}