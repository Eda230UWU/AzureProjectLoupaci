<script>
    export let shared;
    export let indexOfArray

    var loaded = false;
    //shared = "notClicked"
    var vec = {
        name: "debug",
        tasks: [
            { name: "ToDo", taskList: [] },
            { name: "Working on", taskList: [] },
            { name: "finished", taskList: [] },
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
        name: "",
        description: ""
    }

    function updateLocalStorage(indexTasks, b){
        var crazyBuffer = JSON.parse(localStorage.getItem("taskData"))
        crazyBuffer.arr[indexOfArray] = b
        localStorage.setItem("taskData",JSON.stringify(crazyBuffer))
    }


    function addTask(i){
        var buffer = addTaskForms
        addTaskForms = {
        name: "",
        description: ""
        }
        vec.tasks[i].taskList.push(buffer)
        setData(vec)
        updateLocalStorage(i, vec)
        



        loaded = false
        //console.log("realod")
        loaded = true
    }

</script>

<div class="white">
    <h1>white</h1>
    <div class="grey">
        {#if loaded}
            <h1>{vec.name}</h1>
            <div class="flex">
                {#each vec.tasks as task, i}
                    <div class="taskCollumn">
                        <p>{task.name}</p>
                        <div class="addTask">
                            <input bind:value={addTaskForms.name} placeholder="name">
                            <input bind:value={addTaskForms.description} placeholder="description">
                            <!-- <input>
                            <input> -->
                            
                            <button on:click={() => {addTask(i)}}>AddTask</button>
                        </div>
                        {#each task.taskList as eachTask}
                            <div class="tasks">
                                <h2>{eachTask.name}</h2>
                                <p>{eachTask.description}</p>

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
                width: 30%;
                height: 90%;
            }
        }
    }
</style>
