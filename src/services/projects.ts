import axios from "axios"
import {projects, project as projectPath, projectAdmins as projectAdminPath} from "./paths";
import {convNOP, OldProject} from "./models";


export async function getAllProjects(): Promise<OldProject[]> {
    return [...(await projects(async (url) => await axios.get(url))).data.items].map(p => convNOP(p))
}
/*
export async function changeSettings(project: object, project_id: string): Promise<OldProject[]> {
  return (await projectPath(async (url) => await axios.patch(url, {project}), project_id))
}*/

//async function for changing project basic information with patch request
export async function changeSettings(
  project_id: string, 
  lang: string, 
  name: string, 
  abstract: string, 
  description: string): Promise<OldProject[]> {
    return (await projectPath(async (url) => await axios.patch(url, {
    "id":project_id,
    "info":{
      "lang":lang,
      "name":name,
      "abstract":abstract,
      "description":description}
    }), project_id))
}

//async function for getting a single project
export async function getSingleProject (
  project_id: string): Promise<OldProject[]>  {
    return (await projectPath(async (url) => await axios.get(url), project_id)).data
}

//async function for creating a new project
export async function createNewProject (
  project: object): Promise<OldProject[]>  {
    return [... (await projects(async (url) => await axios.post(url, project))).data.items]
}

//async function for adding new project moderator with patch request
export async function addNewMod (
  project_id: string, 
  mod: string): Promise<OldProject[]>  {
    return (await projectAdminPath(async (url) => await axios.post(url, {
      }), project_id, mod))
}
