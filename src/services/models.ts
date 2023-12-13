export interface Info {
    lang: string
    name: string
    abstract: string
    description: string
}

export interface ProjectContact {
    contact_email?: string
    has_research_permit: boolean
    can_contact: boolean
}

export interface Point {
    lat: number
    lon: number
}

export interface Comment {
    id: number
    user: string
    comment: string
    modified_at: string

    waiting_approval?: boolean

    project?: string
    site?: string
    memory?: number
    own?: boolean
}

export interface Memory {
    id: number
    user: string
    title: string
    story?: string
    image?: string
    modified_at: string

    waiting_approval?: boolean
    comments_count: number
    comments: Comment[]
    own?: boolean
}

export interface Site {
    id: string
    info: Info
    location: Point
    image?: string

    waiting_approval?: boolean
    memories_count: number
    memories: Memory[]
    own?: boolean
    creator: string
    modifier: string
}

export interface Project {
    id: string
    info: Info
    anonymous_posting: boolean
    contact?: ProjectContact
    image?: string
    starts?: string
    ends?: string
    admins?: string[]
    owner: string
    site_count: number
    sites?: Site[]
}

export interface Login {
    username?: string
    email?: string
    password: string
}

export interface Register {
    username: string
    email: string
    password: string
}


export interface OldProject {
    id: string
    title: string
    description?: string
    contentDescription?: string
    visitorPosting: boolean
    image?: string
    moderators: string[]
    owner: string
}

export interface OldLocation {
    lat: number
    lng: number
}

export interface OldSite {
    abstract: string
    description: string
    id: string
    title: string
    search: string
    image: string
    uusi: boolean
    muistoja: number
    location: OldLocation
    projectId: string
    waiting_approval?: boolean
    own?: boolean
    creator: string
    modifier: string
   
}

export interface OldMemory {
    id: number
    title: string
    story?: string
    image: string
    search: string
    author?: string
    own?: boolean
    waiting_approval?: boolean
}

export interface Image {
    data: string
}

export interface OldMemoryOutbound {
    id: number
    title: string
    story?: string
    image: Image
    search: string
    author?: string
    own?: boolean
    waiting_approval?: boolean
}

export interface User{
    first_name: string
    last_name: string
    country: string
    city: string
    birth_date: string
}

export function convONP(o: OldProject): Project {
    return {
        id: o.id,
        info: {
            lang: window.localStorage.getItem("ChimneysGoLanguage") || 'fi',
            name: o.title,
            abstract: o.description,
            description: o.contentDescription
        },
        anonymous_posting: o.visitorPosting,
        image: o.image,
        admins: o.moderators || []

    } as Project
}

export function convNOP(o: Project): OldProject {
    return {
        id: o.id,
        title: o.info.name,
        description: o.info.abstract,
        contentDescription: o.info.description,
        visitorPosting: o.anonymous_posting,
        image: o.image,
        moderators: o.admins || [],
        owner: o.owner,
    }
}

export function convONM(o: OldMemoryOutbound): Memory {
    return {
        title: o.title,
        story: o.story,
        image: o.image?.data?.substr(0, 100).replace(/^data:image\/.+;base64,/, '') + o.image?.data?.substr(100),
    } as Memory
}

export function convNOM(o: Memory): OldMemory {
    return {
        id: o.id,
        title: o.title,
        story: o.story,
        image: o.image || 'placeholder.jpg',
        search: o.title,
        author: o.user,
        own: o.own,
        waiting_approval: o.waiting_approval
    }
}

export function convONS(o: OldSite): Site {
    return {
        id: o.title.toString().toLowerCase().replaceAll(new RegExp(/\s/g), '-')
            + '-'
            + Date.now().toString(),
        info: {
            lang: window.localStorage.getItem("ChimneysGoLanguage") || 'fi',
            name: o.title,
        },
        location: {
            lat: o.location.lat,
            lon: o.location.lng
        },
        image: o.image,
        waiting_approval: o.waiting_approval,
        own: o.own,
        creator: o.creator,
        modifier: o.modifier
        
    } as Site
}

export function convNOS(project: string, o: Site): OldSite {
    return {
        abstract: o.info.abstract,
        description: o.info.description,
        id: o.id,
        image: o.image  || 'placeholder.jpg',
        title: o.info.name,
        uusi: false,
        muistoja: o.memories_count,
        location: {
            lat: o.location.lat,
            lng: o.location.lon
        },
        search: o.info.name,
        projectId: project,
        waiting_approval: o.waiting_approval,
        own: o.own,
        creator: o.creator,
        modifier: o.modifier
    }
}


export interface SearchParams {
    location?: Location
    n?: number
    loaded?: string[]
    users?: string[]
}

export interface ErrorDetail {
    code: number,
    message: string,
    details?: Array<string>
}

export interface ApiError {
    error: ErrorDetail
}

/*
export interface Theme {
    pop_background: string
}

const light: Theme = {

}

const setFromJSON = (theme: Theme) => {

}
 */