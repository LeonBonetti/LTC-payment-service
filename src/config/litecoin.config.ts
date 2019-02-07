import * as request from 'request'

const Client = {
    username: process.env.NODEUSERNAME,
    password: process.env.NODEPASSWORD
}

interface ClientRequestResponse<R = any> {
    "result": R,
    "error": string,
    "id": string
}

export function clientRequest<R = any>(
    method: string,
    params: string | Object | null
):Promise<ClientRequestResponse<R>>{
    return new Promise(async (resolve, reject) => {
        if(!process.env.NODEHOST){
            return reject({fail: true, error: 'NODEHOST is not set on .env'})
        }
        const headers = {
            'content-type': 'application/json;'
        }
        const dataToSend = {"jsonrpc": 1.0, "id":"curltest", "method": method, "params": params}

        const dataString = JSON.stringify(dataToSend)

        const options = {
            url: process.env.NODEHOST,
            method: 'POST',
            headers: headers,
            body: dataString,
            auth: {
                'user': Client.username,
                'pass': Client.password
            }
        }
        await request(options, (error, response, body)=>{
            if(error) return reject({fail: true, error})
            resolve(JSON.parse(body))
        })
        
    })
}