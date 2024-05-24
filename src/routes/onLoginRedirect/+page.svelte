<script>
    function redirect() {
        const url = new URL(location.toString()).searchParams
        console.log(url.get("code"))
        localStorage.setItem("spotifyCode", url.get("code"))
        location.href = "/"
    }

</script>


<h1>hello world</h1>
<p>You can now get back to the main page</p>
<button on:click={()=> {redirect()}}><p>redirect</p></button>