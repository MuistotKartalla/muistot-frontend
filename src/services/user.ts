import axios from "axios";
import { user as userPath, username as usernamePath } from "./paths";
import { User } from "./models";


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

export const changeUserSettings = async (first_name: string, last_name: string, 
    country: string, city: string, birth_date: string) => 
    await userPath(async(url) => await axios.patch(url, {
        first_name: first_name,
        last_name: last_name,
        country: country,
        city: city,
        birth_date: birth_date
      }))