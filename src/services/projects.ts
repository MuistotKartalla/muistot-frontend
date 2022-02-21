import axios from "axios"
import {projects} from "./paths";
import {convNOP, OldProject} from "./models";


export async function getAllProjects(): Promise<OldProject[]> {
    return [...(await projects(async (url) => await axios.get(url))).data.items].map(p => convNOP(p))
}
