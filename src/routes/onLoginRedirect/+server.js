import { json } from "@sveltejs/kit"

export async function GET({url}){
    
    let code = new String(url.searchParams.get('code'))
    code = code.substring(0, code.length - 1)
    
    var resp = await getTempAccessToken(code)
    
    console.log(code)
    return json({data: resp})
}

async function getTempAccessToken(code) {
    
    
    var url = 'https://accounts.spotify.com/api/token' 
    var resp = await fetch(url, {
        method: "POST",
        headers:{
        "Content-Type": "x-www-form-urlencoded"
        },
        body: {
            "grant_type": "authorization_code",
            "client_id": "28920abd36f642cab54f4b3f39bd9acb",
            "client_secret": "4e53eddb75fc44c794c2b90319c93086",
            "code": code,
            "redirect_uri": "http://localhost:5173/onLoginRedirect"
        }
    })
    
    
    
    return resp
}