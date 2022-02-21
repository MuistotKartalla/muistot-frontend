const ROOT = ''
const LOGIN = 'login'
const REGISTER = 'register'
const PROJECTS = 'projects'
const SITES = 'sites'
const MEMORIES = 'memories'
const COMMENTS = 'comments'

const toUrl = (parts: string[]): string => ROOT + parts.join('/')

const comments = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string,
    site: string,
    memory: number
) => await pathConsumer(toUrl([
    PROJECTS, project,
    SITES, site,
    MEMORIES, memory.toString(),
    COMMENTS
]))

const comment = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string,
    site: string,
    memory: number,
    comment: number
) => await pathConsumer(toUrl([
    PROJECTS, project,
    SITES, site,
    MEMORIES, memory.toString(),
    COMMENTS, comment.toString()
]))

const memories = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string,
    site: string
) => await pathConsumer(toUrl([
    PROJECTS, project,
    SITES, site.toString(),
    MEMORIES
]))

const memory = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string,
    site: string,
    memory: number
) => await pathConsumer(toUrl([
    PROJECTS, project,
    SITES, site,
    MEMORIES, memory.toString()
]))

const sites = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string
) => await pathConsumer(toUrl([
    PROJECTS, project,
    SITES
]))

const site = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string,
    site: string
) => await pathConsumer(toUrl([
    PROJECTS, project,
    SITES, site
]))

const projects = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([
    PROJECTS
]))

const project = async <T>(
    pathConsumer: ((url: string) => Promise<T>),
    project: string
) => await pathConsumer(toUrl([
    PROJECTS, project
]))

const login = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([ LOGIN]))
const register = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([ REGISTER]))


export {
    comments, comment,
    memories, memory,
    sites, site,
    projects, project,
    login, register
}

