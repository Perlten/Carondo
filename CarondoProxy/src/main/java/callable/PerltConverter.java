/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package callable;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import dto.CarDTO;
import dto.CarExtraDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

public class PerltConverter extends SharedProps implements Callable<List<CarDTO>> {

    private final String URL = "https://perlt.net/CarondoBackend/api/car?";

    public PerltConverter(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        super(color, eco, minSize, maxSize, minPrice, maxPrice);
    }

    @Override
    public List<CarDTO> call() throws Exception {
        String reqUrl = makeUrlString();

        String jsonRes = new URLRequest().request(reqUrl);
        System.out.println(jsonRes);

        JsonElement jelem = gson.fromJson(jsonRes, JsonElement.class);
        JsonArray arr = jelem.getAsJsonArray();

        List<CarDTO> carList = new ArrayList();
        for (JsonElement j : arr) {
            String name = getFieldValueAsString(j, "name");
            String year = getFieldValueAsString(j, "year");
            int price = getFieldValueAsInt(j, "price");
            int size = getFieldValueAsInt(j, "size");
            String imageUrl = getFieldValueAsString(j, "imageUrl");
            String color = getFieldValueAsString(j, "color");
            int echoLevel = getFieldValueAsInt(j, "echoLevel");

            JsonElement manObject = getFieldValueAsJsonObject(j, "manufacturer");
            String manName = getFieldValueAsString(manObject, "name");
            String manYear = getFieldValueAsString(manObject, "year");

            CarDTO car = new CarDTO(manName, name, price, color, size, imageUrl, imageUrl);

            CarExtraDTO extra1 = new CarExtraDTO("Manufacturer Name", manName);
            CarExtraDTO extra2 = new CarExtraDTO("Manufacturer Year", manYear);
            CarExtraDTO extra3 = new CarExtraDTO("Eco Level", String.valueOf(echoLevel));
            CarExtraDTO extra4 = new CarExtraDTO("Year", year);

            car.extra.add(extra1);
            car.extra.add(extra2);
            car.extra.add(extra3);
            car.extra.add(extra4);

            carList.add(car);
        }

        return carList;

    }

    public String makeUrlString() {
        boolean placeAnd = false;
        String reqUrl = URL;
        if (!color.equals("all")) {
            reqUrl += "color=" + color;
            placeAnd = true;
        }
        if (placeAnd) {
            reqUrl += "&";
            placeAnd = false;
        }
        if (eco.equals("yes")) {
            reqUrl += "echoLevel=2,3";
            placeAnd = true;
        } else if (eco.equals("no")) {
            reqUrl += "echoLevel=1";
            placeAnd = true;
        }
        if (placeAnd) {
            reqUrl += "&";
        }
        reqUrl += "minPrice=" + minPrice;
        reqUrl += "&maxPrice=" + maxPrice;
        reqUrl += "&minSize=" + minSize;
        reqUrl += "&maxSize=" + maxSize;
        return reqUrl;
    }

    public static void main(String[] args) {
        PerltConverter c = new PerltConverter("all", "yes", 1, 3, 1, 1000);
        System.out.println(c.makeUrlString());
    }
}
