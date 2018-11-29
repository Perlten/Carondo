const URI = "https://perlt.net/Carondo/api/cars"

async function handleHttpErrors(res) {
    if (!res.ok) {
        const fullError = await res.json();
        throw {
            status: res.status,
            fullError
        };

    }
    const json = await res.json();
    json["status"] = res.status;
    return json;
}

makeOptions = async (method,body) => {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

 class Facade {
    fetchCars = async (min_seats, max_seats, colors, min_price, max_price, eco) => {
        if(colors.length < 1){
            colors.push("red")
            colors.push("green")
            colors.push("white")
            colors.push("black")
            colors.push("blue")
            colors.push("silver")
        }
        const colorString = colors.join(",")

        console.log(min_seats)
        console.log(max_seats)
        console.log(colorString)
        console.log(min_price)
        console.log(max_price)
        console.log(eco)
        
        const queryURL = URI + `?min_size=${min_seats}&max_size=${max_seats}&color=${colorString}&min_price=${min_price}&max_price=${max_price}&eco=${eco}`;
        
        console.log(queryURL)
        try {
            const options = await makeOptions("GET");
            const res = await fetch(queryURL,options)
            const json = await handleHttpErrors(res)
            return json;
        } catch (e) {
            throw e
        }

    }
}

export default new Facade();