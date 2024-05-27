import { json } from "@sveltejs/kit"

export async function GET({url}){
    
    let code = new String(url.searchParams.get('code'))
    code = code.substring(0, code.length - 1)

    var resp = await getTempAccessToken(code)
    
    console.log(JSON.stringify(resp))
    return json({body: JSON.stringify(resp)})
}

async function getTempAccessToken(code) {
    
    //console.log(code)    
    var url = 'https://accounts.spotify.com/api/token' 
    var client_id = "28920abd36f642cab54f4b3f39bd9acb"
    var client_secret = "4e53eddb75fc44c794c2b90319c93086"
    console.log(`Basic ${new Buffer.from(client_id + ':' + client_secret).toString('base64')}`)
    var resp = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${new Buffer.from(client_id + ':' + client_secret).toString('base64')}`
        },
        body: {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:5173/onLoginRedirect"
        }
    })
    console.log()
    console.log("debug" + await resp.text())
    
    return resp
}