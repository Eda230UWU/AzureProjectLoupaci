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

            //console.log(respBody);
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
            // console.log(resp);
            if (resp.status == 204) {
                console.log("no playback")
            }
            else{
            var respBody = JSON.parse(await resp.text());

            return respBody}
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
        currentPlayback = await getCurrentPlayback()
        // console.log(currentPlayback)
        //if(currentPlayback) if not playing 
        if(currentPlayback.is_playing) {
            if (checkAuth()) {
            // console.log("stop")
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
            var apiUrl = "https://api.spotify.com/v1/me/player/play"
            var body = JSON.stringify({
                    "position_ms": currentPlayback.progress_ms,
                    "context_uri": currentPlayback.context.uri,
                    //"uris": [currentPlayback.item.uri]
                })
            // console.log("play")
            var resp = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                }
                //,body: body
            })
        }
                
            
            
            //console.log()
            // console.log(await resp.text())

        }
        
    }
    async function startPlayback(songIndex){
        var playlistIndex = localStorage.getItem("playlistIndex")
        var apiUrl = "https://api.spotify.com/v1/me/playlists";

        if (checkAuth()) {
            var resp = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });

            var respBody = JSON.parse(await resp.text());

            // console.log(respBody);
        }

        if (checkAuth()) {
            var apiUrl = "https://api.spotify.com/v1/me/player/play"
            var body = JSON.stringify({
                    "offset": { "position": songIndex },
                    "context_uri": respBody.items[playlistIndex].uri,
                    //"uris": [currentPlayback.item.uri]
                })
            //console.log("play songs")
            var respa = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
                body: body
        })}

        //console.log(respa)
    } 

    async function selectPlaylist(data, index) {
        localStorage.setItem("playlistIndex", index)
        var playlist = data.tracks.href;
        //console.log(data)
        if (checkAuth()) {
            var resp = await fetch(playlist, {
                method: "GET",
                headers: {
                    Authorization:
                        authToken.token_type + " " + authToken.access_token,
                },
            });
            var respBody = JSON.parse(await resp.text());
            // console.log(respBody);
        }

        selectedPlaylist = respBody;
        playlistSelected = true;
        //console.log(selectedPlaylist);
    }

    function goBackToPlaylistSelection() {
        playlistSelected = false;
        selectedPlaylist = "";
    }
</script>

<div class="spotify">
    <div class="flex">
        <div class="buttons">
            <!--from start play/pause skip + volume slider-->
            <button on:click={() => {previousTrack()}}><p>&#171</p></button>
            <button on:click={() => {stopStartPlayback()}}><p>&#9658</p></button>
            <button on:click={() => {nextTrack()}}><p>&#187</p></button>
            <div class="volume and playback">
                
            </div>
        </div>
        <div class="logo">
        <i>Powered by:</i>
        <img src="/spotifyLogo.png" alt="fortnite" />
        </div>
    </div>
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
                
                <div class="playlists">
                    {#if playlistSelected}
                        <button
                            on:click={() => {
                                goBackToPlaylistSelection();
                            }}>Back to selection</button
                        >
                        <div class="headerContainer">
                            <p>Name</p>
                        </div>
                        <div class="songs">
                            {#each selectedPlaylist.items as songs, i}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="song" on:click={()=>{startPlayback(i)}}>
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
                            {#each playlistData.items as data, index}
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div
                                    class="playlistContainer"
                                    on:click={() => {
                                        selectPlaylist(data, index);
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
       
</div>


 <style lang="scss">
    * {
        color: #ffffff;
        background-color: #000000;
    }

    
    div.spotify{
        
        padding: 5px;
        background-color: #000000;
        max-height: 250px;
        max-width: 100%;
        height: 250px;
        //width: 490px;
        overflow: hidden;
        display: flex;
        flex-direction: row-reverse;
        border-radius: 15px;
        


        div.playlist {
            max-height: 240px;

            justify-self: end;
            align-self: flex-start;
            overflow: scroll;
            img {
                max-width: 200px;

            }
        }
        div.flex{

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: initial;

            div.logo{
                display: flex;
                flex-direction: column;
                align-self: flex-end;
                justify-self: end;
                margin-top: 120px;
                i {
                    font-weight: 600;
                    font-size: 12px;
                    margin-bottom: 2px;
                }

                img {
                    width: 100px;
                }
                
            }
        }
    }
 </style>