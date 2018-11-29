import URL from "./URL";
import { handleHttpErrors, makeOptions, setToken } from "./FacadeUtils";

class LoginFacade {
    login = async (email, password) => {
        const options = makeOptions("POST", false, { email, password })
        try {
            const res = await fetch(URL + "employee/login", options);
            const json = await handleHttpErrors(res);
            setToken(json.token);
            json.status = res.status;
            return json;
        } catch (e) {
            return e;
        }
    }

    //If successful the new employee will be returned from the fetch call
    create = async (body) => {
        const options = makeOptions("POST", true, body)
        try {
            const res = await fetch(URL + "employee/create", options)
            const json = await handleHttpErrors(res)
            json.status = res.status
            return json;
        } catch (error) {
            return error
        }
    }
}

export default new LoginFacade()