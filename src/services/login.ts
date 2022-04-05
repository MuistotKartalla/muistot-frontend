import axios from "axios"
import {Login} from "./models";
import {log, logd} from "./settings";
import {login as loginPath} from "./paths";

export interface LoginResult {
    token?: string
    message: string
}

export async function login(credentials: Login): Promise<LoginResult> {
    log('starting login')
    return await loginPath(async (url) => {
        let response = await axios.post(url, credentials)
        if (response.status === 200) {
            return {
                token: response.headers.authorization,
                message: 'ok'
            }
        } else {
            logd(
                () => 'login failed: '
                    + response.status.toString()
                    + '\n'
                    + (response.data.error.message || 'no message')
                    
            )
            return {
                message: response.data.error.message
            }
        }
    })
}
