<script>
    import Spotify from '../nested/spotifyPlayer/spotify.svelte' 
    //import SpotifyLogin from '../nested/spotifyLogin/spotify_login.svelte' 
    import Sidebar from "../nested/Sidebar/sidebar.svelte"
    import Main from "../nested/main/main.svelte"
    import taskCat from "../nested/taskCategories/taskCategories.svelte"
    import TaskCategories from '../nested/taskCategories/taskCategories.svelte';
    //var isDev = process.env.NODE_ENV == 'development'
    //localStorage.setItem("spotifyScope")
    let shared
    let indexOfArray


</script>


<div class='flex'>
    <div style="width: 580px">
        <Sidebar/>
        <!-- <Spotify/> -->
        <TaskCategories bind:shared bind:indexOfArray/>
    </div>

    <Main bind:shared bind:indexOfArray/>
</div>




<style lang="scss">
    div.flex {
        display: flex;
        min-height: 100vh;
        min-width: 100vw;
        // justify-content: space-between;
    }
    
    
</style>
