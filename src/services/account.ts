import {logd, log} from "./settings";

export const getUserSettings = async () => {
    log('Edited user')
}

export const editUserSettings = async (userConfig: any) => {
    logd(() => userConfig)
}


export const deleteAccount = async () => {
    log('Deleted user')
}
