const ROOT = ''
const LOGIN = '/auth/login'
const REGISTER = '/auth/register'
const PROJECTS = 'projects'
const SITES = 'sites'
const MEMORIES = 'memories'
const COMMENTS = 'comments'
const USER = 'me'
const USERNAME = 'username'
const NEW_ADMIN = 'admins?username='
export const EMAIL_ONLY_LOGIN = '/auth/email'
export const EMAIL_ONLY_EXCHANGE = '/auth/email/exchange'
export const VERIFY_USER_EXCHANGE = '/auth/confirm'

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

const projectAdmins = async <T>(
  pathConsumer: ((url: string) => Promise<T>),
  project: string, 
  admin: string
) => await pathConsumer(toUrl([
  PROJECTS, project,
  NEW_ADMIN
]) + admin)

const login = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([ LOGIN]))
const register = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([ REGISTER]))
const user = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([ USER]))
const username = async <T>(pathConsumer: ((url: string) => Promise<T>)) => await pathConsumer(toUrl([ USER, USERNAME]))
export {
    comments, comment,
    memories, memory,
    sites, site,
    projects, project, projectAdmins,
    login, register,
    user, username
}

