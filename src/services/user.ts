import axios from "axios";
import { user as userPath, username as usernamePath } from "./paths";



export const getUser = async() =>  
    await userPath(async (url) => await axios.get(url)
    )
  

export const changeUsername = async (username:string) => 
    await usernamePath(
    async (url) => { const token = (await axios.post(url,null,{
        params:{username:username}
    })
    ).headers.authorization
    if (token){window.localStorage.setItem('ChimneysGoToken', token)}}
)

