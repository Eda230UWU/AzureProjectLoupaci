<script>
    
    import Spotify from "../spotifyPlayer/spotify.svelte"
    import {onMount} from "svelte"
    export let shared
    export let indexOfArray
    var indexes = []

    var tabs = {
        arr: [{
            name: "Home",
            tasks: [
                {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
            ]
        },
        {
            name: "Work",   
            tasks: [
                {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
            ]

        },
        {
            name: "School",
            tasks: [
                {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
            ]
        }]
    }
    //console.log(tabs)
    
    export let loaded = false
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
                    {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
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
                {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
            ]
        },
        {
            name: "Work",   
            tasks: [
                {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
            ]

        },
        {
            name: "School",
            tasks: [
                {name: "ToDo", taskList: []},{name: "In progess", taskList: []},{name: "Done", taskList: []}
            ]
        }]
        }

        localStorage.setItem("taskData", JSON.stringify(tabsa))
        tabs = JSON.parse(localStorage.getItem("taskData"))
        
    }

    var importText = "";

    function importData(a) {
        if(a != "" || a != undefined){
            a = atob(a);
            localStorage.setItem("taskData", a);
            console.log(a);
        }
        console.log("Spusteno");
    };

    function exportData() {
        var dataToExport = localStorage.getItem("taskData");
        console.log(JSON.parse(dataToExport));
        console.log(btoa(dataToExport));
    };

    function update() {
        tabs = JSON.parse("taskData")
    }

    // $: loaded, update()    
</script>

<div class='white'>

    <h1>Task categories</h1>
    <button on:click={() => {localStorage.setItem("taskData", null); reset(); loaded = false; loaded = true}} ><p>delete tabs</p></button>
    <input bind:value={importText} type="text" placeholder="Import data" id="importText">
    <button on:click={() => {importData(importText)}} id="import"><p>Import</p></button>
    <button on:click={() => {exportData()}} id="export"><p>Export</p></button>

    <h1>Add entry</h1>
    <div class="add">
        <input bind:value={buffer} placeholder="name">
        <button id="submit" on:click={() => {addEntry(buffer)}}></button>
    </div>


    {#if loaded}
        <!-- <button style="display: none;"  on:click={update()}></button> -->
        {#each tabs.arr as tabs, i}
            <div class="tabs">
                <button on:click={() => {shared = tabs; indexOfArray = i}}><p>{tabs.name}</p></button>
                <p></p> 

            </div>
        {/each}  

    {/if}
    


    <div class="spotify">
        <Spotify/>  
    </div>
</div>

<style lang="scss">

    button#submit{
        
        background-image: url("/icon_add.png");
        background-size: contain;
        background-repeat: no-repeat;
        min-width: 50px;
        width: 50px;
        // height: 50px;
        // min-height: 50px;
        
        padding: 0px;
        background-color: #00000000;
        border-width: 0px;

    }

    button#import, button#export {
        width: 100%;
    }

    input#importText {
        padding-top: 20px;
        padding-bottom: 20px;
    }



    div.white {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        max-width: 500px;
        min-width: 500px;
        min-height: 100vh;
        height: 100vh;
        div.tabs {
            display: flex;
            justify-content: space-between;
        
            button {
                width: 150px;
                display: flex;
                align-content: start;
                
                background-color: #ffffff;
                border-width: 0px;
            }
        }

        div.add {
            display: flex;    
            height: 45px;
            justify-content: space-between;
            input {
                                        
            }
        }

        div.spotify {
            //margin-top: 500px;
            align-self: center;
            justify-self: end;
            width: 450px;

        }

    }   

</style>