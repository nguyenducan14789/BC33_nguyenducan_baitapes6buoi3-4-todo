console.log("aaa")
let taskList = []
let taskComplete = []
document.querySelector("#addItem").onclick = () => {
    let task = document.querySelector("#newTask").value;
    console.log(task)
    
    taskList.push(task)
    renderTasks(taskList)
    saveLocalStorage(taskList, 'arrS')

    document.querySelector("#newTask").value = "";
}

let renderTasks = (arr) => {
    html = ""
    for(let i = 0; i < arr.length; i++){
        let job = arr[i]

        let str = `
        <li class="row" id="${i}" value="false">
            <p>${job}</p>
            <div>
                <button onclick="delTask(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button onclick="check(${i})" class = "check">
                    <i class="fa-solid fa-circle-check"></i>
                </button>
            </div>
        </li>
        `
        html += str
    }
    document.querySelector("#todo").innerHTML = html
}

function delTask(idClick) {
    let indexdel = -1;
    for (let index = 0; index < taskList.length; index++) {
        if (index === idClick) {
            indexdel = index;
            break;
        }
    }
    if (indexdel !== -1) {
        taskList.splice(indexdel, 1);

        renderTasks(taskList);
        saveLocalStorage(taskList, 'arrS')
    }
}

check = (idClick) =>{
    let indexdel = -1;
    for (let index = 0; index < taskList.length; index++) {
        if (index === idClick) {
            indexdel = index;
            break;
        }
    }



    if (indexdel !== -1) {
        taskComplete.push(taskList[indexdel]);

        renderComplete(taskComplete);
        console.log(taskComplete)
        saveLocalStorage(taskList, 'arrS')
        saveLocalStorage(taskComplete, 'arrC')
    }




    if (indexdel !== -1) {
        taskList.splice(indexdel, 1);

        renderTasks(taskList);
        saveLocalStorage(taskList, 'arrS')
    }
}

renderComplete = (arr) =>{
    html = ""
    for(let i = 0; i < arr.length; i++){
        let job = arr[i]

        let str = `
        <li class="row" id="${i}" value="false">
            <p>${job}</p>
            <div>
                <button onclick="delTaskAgain(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button onclick="checkAgain(${i})" class = "check-complete">
                    <i class="fa-solid fa-circle-check" style="color: green;"></i>
                </button>
            </div>
        </li>
        `
        html += str
    }
    document.querySelector("#completed").innerHTML = html
}

function delTaskAgain(idClick) {
    let indexdel = -1;
    for (let index = 0; index < taskComplete.length; index++) {
        if (index === idClick) {
            indexdel = index;
            break;
        }
    }
    if (indexdel !== -1) {
        taskComplete.splice(indexdel, 1);

        renderComplete(taskComplete);;
        saveLocalStorage(taskComplete, 'arrC')
    }
}

checkAgain = (idClick) =>{
    let indexdel = -1;
    for (let index = 0; index < taskComplete.length; index++) {
        if (index === idClick) {
            indexdel = index;
            break;
        }
    }



        if (indexdel !== -1) {
            taskList.push(taskComplete[indexdel]);

            renderTasks(taskList);
            saveLocalStorage(taskList, 'arrS')
            saveLocalStorage(taskComplete, 'arrC')
        }




    if (indexdel !== -1) {
        taskComplete.splice(indexdel, 1);

        renderComplete(taskComplete);
        saveLocalStorage(taskList, 'arrS')
    }
}

document.querySelector("#two").onclick = aToZ = () => {
    taskList.sort()
    renderTasks(taskList);
    saveLocalStorage(taskList, 'arrS')


    taskComplete.sort()
    renderComplete(taskComplete);
    saveLocalStorage(taskComplete, 'arrC')
}


document.querySelector("#three").onclick = zToA = () => {
    taskList.reverse()
    renderTasks(taskList);
    saveLocalStorage(taskList, 'arrS')


    taskComplete.reverse()
    renderComplete(taskComplete);
    saveLocalStorage(taskComplete, 'arrC')
}

function saveLocalStorage(ob, key){
    var str = JSON.stringify(ob);
    localStorage.setItem(key, str)
}

function getLocalStorage(key) {
    if (localStorage.getItem(key)) {
        var str = localStorage.getItem(key);
        //Parse dữ liệu về lại object
        var ob = JSON.parse(str);
        return ob;
    }
    return undefined;
}

window.onload = function () {
    //Lấy ra array sinh viên từ localstorage gán vào staffList
    taskList = getLocalStorage('arrS');
    console.log('taskList', taskList);
    if (taskList == undefined) {
        taskList = []
    }
    renderTasks(taskList);
    console.log(taskList)


    taskComplete = getLocalStorage('arrC');
    console.log('taskComplete', taskComplete);
    if (taskComplete == undefined) {
        taskComplete = []
    }
    renderComplete(taskComplete);
    console.log(taskComplete)
}