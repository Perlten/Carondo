import URL from "./URL";
import { handleHttpErrors, makeOptions } from "./FacadeUtils";

class UrlFacade {

    getUrls = async () => {
        const uri = URL + "urls";
        try {
            const opts = await makeOptions("GET", true)
            const res = await fetch(uri, opts)
            const json = await handleHttpErrors(res)
            return json;
        } catch (e) {
            throw e;
        }

    }

    editUrl = async (object) =>{
        const uri = URL + "urls"
        try{
            const opts = await makeOptions("PUT", true, object)
            const res = await fetch(uri, opts)
            const json = await handleHttpErrors(res)
            return json;
        }catch(e){
            throw e
        }
    }
}

export default new UrlFacade()
