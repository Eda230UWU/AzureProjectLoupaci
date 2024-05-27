<script>
    var spotifyQuery = ""
    
    function submitSearchQuery(){
        console.log(spotifyQuery)
        if (!(spotifyQuery == '')){

            var url = ''
        }
        else {
            alert("query must not be empty")
        }
    } 

</script>

<div class="spotify">
    <h1>Spotify API thingies</h1>
    <img src="/spotifyLogo.png" alt = "fortnite"/>
    <div class="playlist">
        <div class="search">
            <input bind:value={spotifyQuery} placeholder="search for your playlist"/>
            <button on:click={() => {submitSearchQuery()}}><p>search</p></button>
        </div>
        <div class="music">
            
        </div>
    </div>
    <div class="buttons">
        <!--from start play/pause skip + volume slider-->
        <button><p>&#171</p></button>
        <button><p>&#9658</p></button>
        <button><p>&#187</p></button>
    </div>
</div>