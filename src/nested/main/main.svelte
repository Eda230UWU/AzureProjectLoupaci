<script>
    export let shared;
    export let indexOfArray
    
    export let loaded = false;
    //shared = "notClicked"
    var vec = {
        name: "debug",
        tasks: [
            { name: "To-Do", taskList: [] },
            { name: "In progress", taskList: [] },
            { name: "Done", taskList: [] },
        ],
    };

    $: setData(shared);
    
    function setData(shared) {
        if (shared != undefined) {
            vec = shared;
            console.log(vec);
            console.log("debug");
            loaded = false;
            loaded = true;
        }
    }

    var addTaskForms = {
        name: [],
        description: []
    }

    function updateLocalStorage(indexTasks, b){
        var crazyBuffer = JSON.parse(localStorage.getItem("taskData"))
        crazyBuffer.arr[indexOfArray] = b
        localStorage.setItem("taskData",JSON.stringify(crazyBuffer))
    }


    function addTask(i){
        var buffer = addTaskForms
        addTaskForms = {
        name: [],
        description: []
        }
        vec.tasks[i].taskList.push({name: buffer.name[i], description: buffer.description[i]})
        setData(vec)
        updateLocalStorage(i, vec)
        



        loaded = false
        //console.log("realod")
        loaded = true
    }
    

    function next(taskToMove, indexOfTask, indexOfCollumn){
        var dataEdit = JSON.parse(localStorage.getItem("taskData"))
        console.log(dataEdit.arr[indexOfArray].tasks[indexOfCollumn])
        console.log(indexOfArray)
        
        if(indexOfCollumn + 1 == dataEdit.arr[indexOfArray].tasks.length)
            {console.log("sex"); return 0}
        
        dataEdit.arr[indexOfArray].tasks[indexOfCollumn+1].taskList.push(taskToMove)
        dataEdit.arr[indexOfArray].tasks[indexOfCollumn].taskList.splice(indexOfTask, 1)
        console.log(dataEdit.arr[indexOfArray].tasks)
        vec = dataEdit.arr[indexOfArray]
        
        loaded = false
        loaded = true

        localStorage.setItem("taskData", JSON.stringify(dataEdit))
    }

    function before(taskToMove, indexOfTask, indexOfCollumn){
        var dataEdit = JSON.parse(localStorage.getItem("taskData"))
        console.log(dataEdit.arr[indexOfArray].tasks[indexOfCollumn])
        console.log(indexOfArray)
        
        if(indexOfCollumn - 1 < 0)
            {console.log("sex"); return 0}
        
        dataEdit.arr[indexOfArray].tasks[indexOfCollumn-1].taskList.push(taskToMove)
        dataEdit.arr[indexOfArray].tasks[indexOfCollumn].taskList.splice(indexOfTask, 1)
        console.log(dataEdit.arr[indexOfArray].tasks)
        vec = dataEdit.arr[indexOfArray]
        
        loaded = false
        loaded = true

        localStorage.setItem("taskData", JSON.stringify(dataEdit))
    
    }


</script>

<div class="white">
    <h1>Welcome back 👋</h1>
    <div class="grey">
        {#if loaded}
            <h1 id="header1">{vec.name}</h1>
            <div class="flex">
                {#each vec.tasks as task, i}
                    <div class="taskCollumn">
                        <h1>{task.name}</h1>
                        <div class="addTask">
                            <input bind:value={addTaskForms.name[i]} placeholder="name">
                            <input bind:value={addTaskForms.description[i]} placeholder="description">
                            <!-- <input>
                            <input> -->
                            
                            <button on:click={() => {addTask(i)}}>AddTask</button>
                        </div>
                        {#each task.taskList as eachTask, index}
                            <div class="tasks">
                                <h2>{eachTask.name}</h2>
                                <p>{eachTask.description}</p>
                                <button on:click={() => {before(eachTask, index, i)}}>Previous</button>
                                <button on:click={() => {next(eachTask, index, i)}}>Next</button>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    div.white {

        h1#header1{
            align-self: flex-end;
            margin-right: 3%;
        }

        display: flex;
        flex-direction: column;
        max-width: calc(100vw - 580px);
        min-width: calc(100vw - 580px);
        background-color: #ffffff;
        min-height: 100vh;
        justify-content: space-between;
        align-items: center;
    }
    div.grey {
        max-width: 90%;
        width: 90%;
        background-color: #f1efed;
        height: 85vh;
        border-radius: 20px 20px 0px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;

        div.flex {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: space-around;
            margin: 20px;
            div.taskCollumn {
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
                width: calc(30% - 20px);
                height: 90%;
                border-radius: 30px;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }
    }

    div.tasks {
        margin: 20px 20px 0px 0px;
        padding: 15px;
        width: 90%;
        min-height: 100px;
        background-color: #f1efed;
        border-radius: 20px;
        overflow: scroll;
        h2 {
            margin: 5px 0px 0px 5px;
            font-size: 20px;
        }
        p { 
            margin: 5px 0px 20px 0px;
        }

    }

</style>
