import axios from "axios"
import {convNOM, convNOS, convONM, convONS, OldMemory, OldMemoryOutbound, OldSite, SearchParams} from "./models";
import {log} from "./settings";
import {memories, memory as memoryPath, project, site as sitePath, sites} from "./paths";

export const getSites = async (project: string, params?: SearchParams): Promise<OldSite[]> => {
    log('doing search')
    log(params)
    let config = params != null ? { params: params } : {}
    try {
        const response = await sites(async (url) => await axios.get(url, config), project)
        return [...response.data.items].map(s => convNOS(project, s))
    } catch (e) {
        console.log("search failed")
        console.log(e)
        throw e
    }
}

export const getMemories = async (project: string, site: string): Promise<OldMemory[]> => await memories(
    async (url) => [...(await axios.get(url)).data.items].map(m => convNOM(m)),
    project,
    site
)

export const createMemory = async (project: string, site: string, memory: OldMemoryOutbound): Promise<OldMemory> => {
    const newMemory = convONM(memory)
    const res = await memories(async (url) => await axios.post(url, newMemory), project, site)
    if (res.status === 201) {
        console.log("created new memory")
        console.log(newMemory)
        return convNOM((await axios.get(res.headers.location)).data)
    } else {
        throw new Error('failed creation')
    }
}

export const createSite = async (project: string, site: OldSite): Promise<OldSite> => {
    const newSite = convONS(site)
    const res = await sites(async (url) => axios.post(url, newSite), project)
    if (res.status === 201) {
        console.log("created new site")
        console.log(newSite)
        return convNOS(project, (await axios.get(res.headers.location)).data)
    } else {
        throw new Error('failed creation')
    }
}

export const deleteMemory = async (project: string, site: string, memory: number) => await memoryPath(
    async (url) => await axios.delete(url),
    project,
    site,
    memory
)

export const deleteSite = async (project: string, site: string) => await sitePath(
    async (url) => await axios.delete(url),
    project,
    site
)

export const toggleVerifySite = async (project_id: string, site: string, verify?: boolean) => await project(
    async (url) => axios.post(url + '/admin/publish', {
        type: 'site',
        identifier: site,
        publish: verify || true
    }),
    project_id
)

export const toggleVerifyMemory = async (project_id: string, post: number, verify?: boolean) => await project(
    async (url) => axios.post(url + '/admin/publish', {
        type: 'memory',
        identifier: post,
        publish: verify || true
    }),
    project_id
)