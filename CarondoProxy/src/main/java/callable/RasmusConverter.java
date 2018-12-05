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

/**
 *
 * @author Rasmus
 */
public class RasmusConverter extends SharedProps implements Callable<List<CarDTO>> {

    private String URL = "";

    public RasmusConverter(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        super(color, eco, minSize, maxSize, minPrice, maxPrice);
        
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    
    @Override
    public List<CarDTO> call() throws Exception {
        
       
        
        try {
            
        RestUrlFacade ruf = new RestUrlFacade();
        RestUrl ru = ruf.getUrl("Waauwe");
        URL += ru.getUrl();
            
            String reqUrl = URL + "?min_price=" + minPrice;
            reqUrl += "&max_price=" + maxPrice;
            reqUrl += "&min_size=" + minSize;
            reqUrl += "&max_size=" + maxSize;
            if (eco.equals("yes")) {
                reqUrl += "&eco=true";
            } else if (eco.equals("no")) {
                reqUrl += "&eco=false";
            }
            reqUrl += "&color=" + color;
            String jsonRes = new URLRequest().request(reqUrl);
            System.out.println(jsonRes);

            JsonElement jelem = gson.fromJson(jsonRes, JsonElement.class);
            JsonArray arr = jelem.getAsJsonArray();

            List<CarDTO> carList = new ArrayList();
            for (JsonElement j : arr) {

                String brand = getFieldValueAsString(j, "brand");
                String model = getFieldValueAsString(j, "model");
                int price = getFieldValueAsInt(j, "price");
                String color = getFieldValueAsString(j, "color");
                int size = getFieldValueAsInt(j, "seats");
                String imageURL = getFieldValueAsString(j, "imageURL");
                String purchaseURL = getFieldValueAsString(j, "purchaseURL");

                CarDTO car = new CarDTO(brand, model, price, color, size, imageURL, purchaseURL);

                String ecoRating = getFieldValueAsString(j, "ecoRating");
                String horsepower = getFieldValueAsString(j, "horsepower");
                car.extra.add(new CarExtraDTO("Eco rating", ecoRating));
                car.extra.add(new CarExtraDTO("Horsepower", horsepower));

                carList.add(car);

            }

            return carList;
        } catch (Exception e) {
            return new ArrayList();
        }
    }

}
