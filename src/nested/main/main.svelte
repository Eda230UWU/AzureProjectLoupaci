<script>
    export let shared;
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

    function add(){}

</script>

<div class="white">
    <h1>white</h1>
    <div class="grey">
        {#if loaded}
            <h1>{vec.name}</h1>
            <div class="flex">
                {#each vec.tasks as task}
                    <div class="taskCollumn">
                        <p>{task.name}</p>
                        <div class="addTask">
                            <input>
                            <input>
                            <input>
                            <input>
                            
                            <button>AddTask</button>
                        </div>
                        {#each task.taskList as eachTask}
                            <div class="tasks">
                                <p>{eachTask.name}</p>
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
