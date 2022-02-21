import axios from "axios"
import {Register} from "./models";
import {log} from "./settings";
import {register as registerPath} from "./paths";


export async function register(data: Register): Promise<string | null> {
    log('registering user')
    return await registerPath(async (url) => {
        const resp = await axios.post(url, data)
        return resp.status === 201 ? null : resp.data.error.message
    })
}
