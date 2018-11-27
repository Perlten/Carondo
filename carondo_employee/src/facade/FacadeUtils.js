export async function makeOptions (method, addToken, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (addToken && getToken()) {
        opts.headers["x-access-token"] = getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token", token)
}

export async function handleHttpErrors(res) {
    if (!res.ok) {
        const fullError = await res.json();
        throw { status: res.status, fullError };

    }
    const json = await res.json();
    json["status"] = res.status;
    return json;
}