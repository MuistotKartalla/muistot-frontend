import axios from "axios"
import {projects, project as projectPath} from "./paths";
import {convNOP, OldProject} from "./models";


export async function getAllProjects(): Promise<OldProject[]> {
    return [...(await projects(async (url) => await axios.get(url))).data.items].map(p => convNOP(p))
}

export async function changeSettings(project: object, project_id: string): Promise<OldProject[]> {
  return (await projectPath(async (url) => await axios.patch(url, {project}), project_id))
}

//async function for changing project settings with patch request
//for some reason returns "204 No Content" and doesn't work 100% of the time
export async function changeProjectSettings (
  project_id: string, 
  lang: string, 
  name: string, 
  abstract: string, 
  description: string) {
  await projectPath(async (url) => await axios.patch(url, {
    "id":project_id,
    "info":{
      "lang":lang,
      "name":name,
      "abstract":abstract,
      "description":description},
    }), project_id)
}
