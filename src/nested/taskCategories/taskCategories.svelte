<script>

    import Spotify from "../spotifyPlayer/spotify.svelte"
    import {onMount} from "svelte"
    export let shared
    export let indexOfArray

    var tabs = {
        arr: [{
            name: "Home",
            tasks: [
                {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
            ]
        },
        {
            name: "Work",   
            tasks: [
                {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
            ]

        },
        {
            name: "School",
            tasks: [
                {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
            ]
        }]
    }
    //console.log(tabs)
    
    var loaded = false
    onMount(() => {
        
        if(localStorage.getItem("taskData") == "null"){
            localStorage.setItem("taskData", JSON.stringify(tabs))
            tabs = JSON.parse(localStorage.getItem("taskData"))
        }
        else {
            tabs = JSON.parse(localStorage.getItem("taskData"))
        }
        // console.log(tabs)
        // console.log("skib")
        
        shared = tabs.arr[0]
        indexOfArray = 0
        loaded = true
        
        
    });

    var buffer = ''

    function addEntry(name){
        if (name != ''){
            var value = JSON.parse(localStorage.getItem("taskData"))
            var template = {
                name: name,
                tasks: [
                    {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
                ]
            }
            
            value.arr.push(template)
            
            //console.log(value)
            
            localStorage.setItem("taskData", JSON.stringify(value))
            tabs = value
            loaded = false
            loaded = true
        }

    }

    function reset() {
        var tabsa = {
        arr: [{
            name: "Home",
            tasks: [
                {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
            ]
        },
        {
            name: "Work",   
            tasks: [
                {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
            ]

        },
        {
            name: "School",
            tasks: [
                {name: "ToDo", taskList: []},{name: "Working on", taskList: []},{name: "finished", taskList: []}
            ]
        }]
        }

        localStorage.setItem("taskData", JSON.stringify(tabsa))
        tabs = JSON.parse(localStorage.getItem("taskData"))
    }
</script>

<div class='white'>
    <h1>task cat</h1>
    <button on:click={() => {localStorage.setItem("taskData", null); reset(); loaded = false; loaded = true}}>delete tabs</button>

    <div class="add">
        <h1>add entry</h1>
        <input bind:value={buffer} placeholder="name">
        <button on:click={() => {addEntry(buffer)}}>submit</button>
    </div>


    {#if loaded}
        {#each tabs.arr as tabs, i}
            <div class="tabs">
                <button on:click={() => {shared = tabs; indexOfArray = i}}>{tabs.name}</button>
                <p>{tabs.tasks.length}</p>
            </div>
        {/each}  

    {/if}
    


    <div class="spotify">
        <Spotify/>  
    </div>
</div>

<style lang="scss">

    div.white {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        max-width: 500px;
        min-width: 500px;
        
        div.tabs {
            display: flex;
            justify-content: space-between;
        }

        div.add {
            display: flex;    
            input {
                                        
            }
        }

        div.spotify {
            align-self: flex-end;
            justify-self: end;

        }

    }   

</style>