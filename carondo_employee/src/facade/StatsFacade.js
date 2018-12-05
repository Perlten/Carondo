import URL from "./URL";
import { handleHttpErrors, makeOptions } from "./FacadeUtils";

class StatsFacade {
    getStatistics = async () => {
        const statURL = URL + "stat"
        try {
            const opts = makeOptions("GET", true);
            const res = await fetch(statURL, opts);
            const json = await handleHttpErrors(res);
            return { stats: json, status: res.status };
        } catch (e) {
            return e;
        }
    }
}

export default new StatsFacade()