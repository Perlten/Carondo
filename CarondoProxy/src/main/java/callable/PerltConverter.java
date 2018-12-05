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
import entity.RestUrl;
import facade.RestUrlFacade;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

public class PerltConverter extends SharedProps implements Callable<List<CarDTO>> {

    private String URL = "";

    public PerltConverter(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        super(color, eco, minSize, maxSize, minPrice, maxPrice);
    }

    @Override
    public List<CarDTO> call() throws Exception {
        RestUrlFacade ruf = new RestUrlFacade();
        RestUrl ru = ruf.getUrl("Perlt");
        URL += ru.getUrl();
        try {
            
            String reqUrl = makeUrlString();

            String jsonRes = new URLRequest().request(reqUrl);
            System.out.println(jsonRes);

            JsonElement jelem = gson.fromJson(jsonRes, JsonElement.class);
            JsonArray arr = jelem.getAsJsonArray();

            List<CarDTO> carList = new ArrayList();
            for (JsonElement j : arr) {
                String name = getFieldValueAsString(j, "name");
                int price = getFieldValueAsInt(j, "price");
                int size = getFieldValueAsInt(j, "size");
                String imageUrl = getFieldValueAsString(j, "imageUrl");
                String pageUrl = getFieldValueAsString(j, "pageUrl");
                String color = getFieldValueAsString(j, "color");

                JsonElement manObject = getFieldValueAsJsonObject(j, "manufacturer");
                String manName = getFieldValueAsString(manObject, "name");
                String manYear = getFieldValueAsString(manObject, "year");
                
                CarDTO car = new CarDTO(manName, name, price, color, size, imageUrl, pageUrl);

                String year = getFieldValueAsString(j, "year");
                int echoLevel = getFieldValueAsInt(j, "echoLevel");
                int horsePower = getFieldValueAsInt(j, "horsePower");
                int RPM = getFieldValueAsInt(j, "RPM");
                String safetyRating = getFieldValueAsString(j, "safetyRating");
                int maxSpeed = getFieldValueAsInt(j, "maxSpeed");
                double oneToHundred = getFieldValueAsDouble(j, "oneToHundred");


                List<CarExtraDTO> extraDTOs = new ArrayList<>();
                extraDTOs.add(new CarExtraDTO("Manufacturer Name", manName));
                extraDTOs.add(new CarExtraDTO("Manufacturer Year", manYear));
                extraDTOs.add(new CarExtraDTO("Eco Level", String.valueOf(echoLevel)));
                extraDTOs.add(new CarExtraDTO("Year", year));
                extraDTOs.add(new CarExtraDTO("HorsePower", String.valueOf(horsePower)));
                extraDTOs.add(new CarExtraDTO("RPM", String.valueOf(RPM)));
                extraDTOs.add(new CarExtraDTO("Safety Rating", safetyRating));
                extraDTOs.add(new CarExtraDTO("Max Speed", String.valueOf(maxSpeed)));
                extraDTOs.add(new CarExtraDTO("One to hundred", String.valueOf(oneToHundred) + " Sec"));

                for (CarExtraDTO extraDTO : extraDTOs) {
                    car.extra.add(extraDTO);
                }

                carList.add(car);
            }

            return carList;
        } catch (Exception e) {
            return new ArrayList();
        }

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

    public void setURL(String URL) {
        this.URL = URL;
    }
    
}
