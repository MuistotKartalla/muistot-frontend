import axios from "axios";
import { User } from "./models";
import { user as userPath } from "./paths";



export const getUser = async(): Promise<User> => 
    await userPath(
    async (url) => (await axios.get(url)).data
    )     
  






