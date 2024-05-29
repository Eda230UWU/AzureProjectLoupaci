<script>
    async function spotifyLogin() {
        var isDev = process.env.NODE_ENV == 'development'
        var show_dialog = false
        var redirect_uri = isDev ? encodeURIComponent('http://localhost:5173/onLoginRedirect') : encodeURIComponent('https://loupaci-test-branch.azurewebsites.net/');
        //var redirect_uri = encodeURIComponent("https://loupaci-test-branch.azurewebsites.net/");
        var client_id = "28920abd36f642cab54f4b3f39bd9acb"
        var response_type = "code"
        
        //var scope = 'user-read-private user-read-email streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-played playlist-read-private playlist-read-collaborative user-follow-read user-read-playback-position user-top-read user-library-read'    
        var scope = 'user-read-private user-read-email streaming app-remote-control playlist-read-private playlist-read-collaborative user-follow-read user-read-playback-position user-top-read user-library-read user-modify-playback-state user-read-playback-state'
        var url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&show_dialog=${show_dialog}&scope=${scope}`
 
        
        //var state = to be implemented 
 
        location.assign(url)

    }
        

</script>


    
<button on:click={() => {spotifyLogin()}}><p> </p></button>
    <!-- <img src="icon_spotify.png" alt="Spotify" width="22" height="22"> -->
    


<style>

    button {
        background-image: url("/icon_spotify.png");
        background-size: 20px;
        background-position: 50% 0px;
        background-repeat: no-repeat;
        background-color: #00000000;
        height: 40px;
        width: 80px;
        margin: 0px;
        border: 0px;

    }
</style>