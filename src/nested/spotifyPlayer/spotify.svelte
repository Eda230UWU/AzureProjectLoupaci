<script>
    import { onMount } from "svelte";

    var spotifyQuery = "";
    var selectedPlaylist;
    var playlistSelected = false;
    var placeholder = true;
    var authToken;
    var authTokenExpiration;
    var playlistData = "";
    var alwaysFalse = false;
    var currentPlayback; 
    onMount(() => {
        authToken = JSON.parse(localStorage.getItem("authToken"));
        authTokenExpiration = localStorage.getItem("authTokenExpiration");
    });
    //playlistData = getUserPlaylists();
    //currentPlayback = getCurrentPlayback()

    // async function submitSearchQuery() {
    //     console.log(spotifyQuery);
    //     if (!(spotifyQuery == "")) {
    //         var url = "";
    //     } else {
    //         alert("query must not be empty");
    //     }
    // }

    function checkAuth() {
        authToken = JSON.parse(localStorage.getItem("authToken"));
        authTokenExpiration = localStorage.getItem("authTokenExpiration");
        var time = new Date().getTime();
        //console.log(JSON.parse(authToken))

        // console.log(authTokenExpiration)
        // console.log(time)

        if (authTokenExpiration < time) {
            //request new token

            if (true) {
                alert("expiredToken");
                return 0;
            }
        }

        if (
            !(
                authToken.token_type != undefined &&
                authToken.access_token != undefined
            )
        ) {
            alert("undefined");
            return 0;
        }

        return 1;
    }

    async function getUserPlaylists() {
        
        var apiUrl = "https://api.spotify.com/v1/me/playlists";
        playlistSelected = false;
        placeholder = false;
        //console.log(JSON.parse(authToken))

        // console.log(authTokenExpiration)
        // console.log(time)

        if (checkAuth()) {
            var resp = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });

            var respBody = JSON.parse(await resp.text());

            console.log(respBody);
        } else {
            alert("bad request data");
        }
        
        return respBody;
    }

    async function getCurrentPlayback(){
        if (checkAuth()) {
            var apiUrl = 'https://api.spotify.com/v1/me/player'

            var resp = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });
            console.log(resp);
            if (resp.status == 204) {
                console.log("no playback")
            }
            else{
            var respBody = JSON.parse(await resp.text());

            console.log(respBody);}
        } else {
            alert("bad request data");
        }
    }

    async function previousTrack(){
        currentPlayback = getCurrentPlayback()
        if (checkAuth()) {
            var apiUrl = "https://api.spotify.com/v1/me/player/previous"
            var resp = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });
        }
    }
    async function nextTrack(){
        currentPlayback = getCurrentPlayback()
        if (checkAuth()) {
            var apiUrl = "https://api.spotify.com/v1/me/player/next"    
            var resp = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });
        }
    }
    async function stopStartPlayback(){
        currentPlayback = getCurrentPlayback()
        //if(currentPlayback) if not playing 
        if(currentPlayback.is_playing) {
            if (checkAuth()) {
            var apiUrl = "https://api.spotify.com/v1/me/player/pause"
            var resp = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                    },
                });
            }
        }
        else {
            if (checkAuth()) {
            var apiUrl = "https://api.spotify.com/v1/me/player/pause"
            var resp = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                    },
                });
            }

        }
        
    }
    async function startPlayback(uri){

    } 

    async function selectPlaylist(data) {
        var playlist = data.tracks.href;

        if (checkAuth()) {
            var resp = await fetch(playlist, {
                method: "GET",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });
            var respBody = JSON.parse(await resp.text());
            console.log(respBody);
        }

        selectedPlaylist = respBody;
        playlistSelected = true;
        console.log(selectedPlaylist);
    }

    function goBackToPlaylistSelection() {
        playlistSelected = false;
        selectedPlaylist = "";
    }
</script>

<div class="spotify">
    <h1>Spotify API thingies</h1>
    <img src="/spotifyLogo.png" alt="fortnite" />
    <div class="playlist">
        <div class="search">
            <!-- <input bind:value={spotifyQuery} placeholder="search for your playlist"/>
            <button on:click={() => {submitSearchQuery()}}><p>search</p></button> -->
            <button
                on:click={() => {
                    playlistData = getUserPlaylists(); alwaysFalse = true
                }}><p>get your playlists</p></button
            >
        </div>
        <div class="music">
            {#if alwaysFalse}
                <h1>playlists</h1>
                <div class="playlists">
                    {#if playlistSelected}
                        <button
                            on:click={() => {
                                goBackToPlaylistSelection();
                            }}>Back to selection</button
                        >
                        <div class="headerContainer">
                            <p>name xd</p>
                        </div>
                        <div class="songs">
                            {#each selectedPlaylist.items as songs}
                                <div class="song">
                                    <p>
                                        {songs.track.name} by {#each songs.track.album.artists as artists, i}
                                            {artists.name}
                                            {#if !(i == songs.track.album.artists.length - 1)},
                                            {/if}
                                        {/each}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        {#await playlistData}
                            <p>fetching your playlists</p>
                        {:then playlistData}
                            <a href={playlistData.href}>User link</a>
                            {#each playlistData.items as data}
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div
                                    class="playlistContainer"
                                    on:click={() => {
                                        selectPlaylist(data);
                                    }}
                                >
                                    <h2>{data.name}</h2>
                                    <p>{data.description}</p>
                                    <!-- <a href={data.owner.external_urls.spotify}>link</a> -->
                                    <img src={data.images[0].url} alt="img" />
                                </div>
                            {/each}
                        {/await}
                    {/if}
                </div>
            {/if}
        </div>
    </div>
    
    <div class="buttons">
        <!--from start play/pause skip + volume slider-->
        <button on:click={() => {previousTrack()}}><p>&#171</p></button>
        <button on:click={() => {stopStartPlayback()}}><p>&#9658</p></button>
        <button on:click={() => {nextTrack()}}><p>&#187</p></button>
        <div class="volume and playback">
            
        </div>
    </div>
</div>
