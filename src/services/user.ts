import axios from "axios";
import { User } from "./models";
import { user as userPath, username as usernamePath } from "./paths";



export const getUser = async(): Promise<User> => 
    await userPath(
    async (url) => (await axios.get(url)).data
    )     
  




export const changeUsername = async (username:string) => 
    await usernamePath(
    async (url) => await axios.post(url,null,{params:{username:username}})
)

