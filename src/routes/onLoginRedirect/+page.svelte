<script>
    async function redirect() {
        const url = new URL(location.toString()).searchParams
        console.log(url.get("code"))
        localStorage.setItem("spotifyCode", url.get("code"))

        //getTempAccessToken(localStorage.getItem("spotifyCode"))
        var resp = await fetch(`/onLoginRedirect?code=${url.get("code")}}`, {
            method: "GET"            
        })
        console.log(JSON.stringify(resp))
        userData()
        //location.href = "/"
        
    }

    

    async function userData(){
        console.log('data xd')
    }
</script>


<h1>hello world</h1>
<p>You can now get back to the main page</p>
<button on:click={()=> {redirect()}}><p>redirect</p></button>