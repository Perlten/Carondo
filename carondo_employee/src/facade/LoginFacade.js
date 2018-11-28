import URL from "./URL";
import { handleHttpErrors, makeOptions, setToken } from "./FacadeUtils";

class LoginFacade {
    login = async (email, password) => {
        const options = makeOptions("POST", false, { email, password })
        console.log(options);
        try {
            const res = await fetch(URL + "employee/login", options);
            const json = await handleHttpErrors(res);
            setToken(json);
            json.status = 200;
            return json;
        } catch (e) {
            return e;
        }
    }
}

export default new LoginFacade()