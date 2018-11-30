import URL from "./URL";
import { handleHttpErrors, makeOptions } from "./FacadeUtils";


class EmpCrudFacade {

    getEmployees = async () => {
        const empUrl = URL + "employee"
        try {
            const opts = makeOptions("GET", true);
            const res = await fetch(empUrl, opts);
            const json = await handleHttpErrors(res);
            return { emp: json, status: res.status };
        } catch (e) {
            return e;
        }
    }

    edit = async (emp) => {
        try {
            const opts = makeOptions("PUT", true, emp);
            const res = await fetch(URL + "employee/edit", opts);
            const json = await handleHttpErrors(res);
            return { emp: json, status: res.status };
        } catch (error) {
            return error;
        }
    }

    delete = async (emp) => {
        try {
            const opts = makeOptions("DELETE", true, emp)
            const res = await fetch(URL + "employee/delete", opts)
            const json = await handleHttpErrors(res)
            return { emp: json, status: res.status }
        } catch (error) {
            return error
        }
    }
}

export default new EmpCrudFacade();