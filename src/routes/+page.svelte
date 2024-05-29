<script>
    import Spotify from '../nested/spotifyPlayer/spotify.svelte' 
    import SpotifyLogin from '../nested/spotifyLogin/spotify_login.svelte' 
    import Sidebar from "../nested/Sidebar/sidebar.svelte"
    //var isDev = process.env.NODE_ENV == 'development'
    //localStorage.setItem("spotifyScope")
    


</script>


<div class='flex'>
    <Sidebar/>
    <Spotify/>
    
    <div>
        <p>login</p>
        <SpotifyLogin/>
    </div>
</div>




<style lang="scss">
    div.flex {
        display: flex;

    }
    
</style>
