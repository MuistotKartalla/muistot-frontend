let DEBUG: boolean = window.localStorage.getItem('muistot-debug') === 'enable'

export function log(message: any) {
    if (DEBUG) {
        console.log(message)
    }
}

export function logd(message: () => any) {
    if (DEBUG) {
        console.log(message())
    }
}