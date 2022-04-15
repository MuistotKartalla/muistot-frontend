import {EMAIL_ONLY_EXCHANGE, VERIFY_USER_EXCHANGE} from "./paths";
import axios from "axios";
import {log} from "./settings";

type Params = {
    endpoint?: string
    verified?: boolean
    user?: string
    token?: string
    [key: string]: string | boolean | undefined
}

export const checkLocation = (on_first_login?: () => Promise<any>) => {
    const hash = window.location.hash

    const is_verify = hash.startsWith("#verify-user")
    const is_email_login = hash.startsWith("#email-login")

    let endpoint;
    if (!is_verify && !is_email_login) {
        return
    } else {
        if (window.history.replaceState) {
            window.history.replaceState(null, "", "#");
        } else {
            window.location.hash = "#";
        }
        if (is_verify) {
            endpoint = VERIFY_USER_EXCHANGE;
        } else {
            endpoint = EMAIL_ONLY_EXCHANGE;
        }
    }

    const parts = hash.split(":", 2)
    const params: Params = {}

    if (endpoint && parts.length === 2) {
        params.endpoint = endpoint;
        (parts[1] as string).split("&")
            .map(o => (o as string).split("=", 2))
            .filter(o => o.length === 2)
            .forEach(o => params[o[0]] = o[1]);
        params.verified = is_verify
            ? false
            : ((params.verified as unknown as string).toLowerCase() || "true") === "true";
    }

    if (['verified', 'user', 'token', 'endpoint'].map(o => params[o] !== undefined).reduce((p, c) => p && c)) {
        log(`User is verified: ${params.verified ? "true" : "false"}`);
        (async () => await axios.post(EMAIL_ONLY_EXCHANGE, null, {
                params: {
                    user: params.user,
                    token: params.token
                },
                headers: {}
            }).then(async response => {
                if (response.status === 200) {
                    const token = (response.headers || {}).authorization
                    if (token) {
                        window.localStorage.setItem('ChimneysGoToken', token)
                        if (on_first_login && !params.verified) {
                            await on_first_login()
                        }
                    }
                } else {
                    log(`Failed initial operation with code ${response.status} on url ${params.endpoint}`)
                }
            }).catch(reason => {
                log(`Failed request on  ${params.endpoint} with reason:\n - ${reason.toString()}`)
            })
        )();
    }

}