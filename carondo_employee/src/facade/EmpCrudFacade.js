import URL from "./URL";
import { handleHttpErrors, makeOptions } from "./FacadeUtils";


class EmpCrudFacade {

    getEmployees = async () => {
        const empUrl = URL + "employee"
        try {
            const opts = makeOptions("GET", true);
            const res = await fetch(empUrl, opts);
            const json = await handleHttpErrors(res);
            return {emp: json, status: res.status};
        } catch (e) {
            return e;
        }
    }
}

export default new EmpCrudFacade();