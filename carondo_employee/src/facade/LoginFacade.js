import URL from "./URL";
import { handleHttpErrors, makeOptions, setToken } from "./FacadeUtils";

class LoginFacade {
    login = async (email, password) => {
        const options = makeOptions("POST", false, { email, password })
        // fetch(URL + "/employee/login", options)
        //     .then(res => handleHttpErrors(res)).then(json => setToken(json))

        try {
            const res = await fetch(URL + "/employee/login", options);
            const json = await handleHttpErrors(res);
            setToken(json);
        } catch (e) {
            return e;
        }
    }
}

export default new LoginFacade()