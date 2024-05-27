<script>
    async function redirect() {
        const url = new URL(location.toString()).searchParams
        //console.log(url.get("code"))
        localStorage.setItem("spotifyCode", url.get("code"))

        //getTempAccessToken(localStorage.getItem("spotifyCode"))
        var resp = await fetch(`/onLoginRedirect?code=${url.get("code")}}`, {
            method: "GET"            
        })

        var data = await resp.text()
        var data = JSON.parse(data)
        var data = data.body
        //console.log(data)
        
        
        var code = await userData(data)
        console.log(code)
        //location.href = "/"
        
    }

    

    async function userData(data){

        var time = new Date().getTime()
        
        localStorage.setItem("authToken", JSON.stringify(data))
        localStorage.setItem("authTokenExpiration", JSON.parse(localStorage.getItem("authToken")).expires_in + time)
        
        
        return "success"
    }
</script>


<h1>hello world</h1>
<p>You can now get back to the main page</p>
<button on:click={()=> {redirect()}}><p>redirect</p></button>