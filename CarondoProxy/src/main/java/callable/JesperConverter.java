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

public class JesperConverter extends SharedProps implements Callable<List<CarDTO>> {

    private boolean first = true;
    private String reqUrl = "";

    public JesperConverter(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        super(color, eco, minSize, maxSize, minPrice, maxPrice);
    }

    @Override
    public List<CarDTO> call() throws Exception {
            RestUrlFacade ruf = new RestUrlFacade();
            RestUrl ru = ruf.getUrl("Jesper Inc");
            reqUrl += ru.getUrl();
        
        try {   
           
            if (!color.equals("all")) {
                checkIfFirst();
                reqUrl += "color=" + color;
            }

            if (eco.equals("yes")) {
                checkIfFirst();
                reqUrl += "eco=1";
            } else if (eco.equals("no")) {
                checkIfFirst();
                reqUrl += "eco=2";
            }
            checkIfFirst();
            reqUrl += "minprice=" + minPrice;
            checkIfFirst();
            reqUrl += "maxprice=" + maxPrice;
            checkIfFirst();
            reqUrl += "minsize=" + minSize;
            checkIfFirst();
            reqUrl += "maxsize=" + maxSize;
            String jsonRes = new URLRequest().request(reqUrl);
            System.out.println(jsonRes);

            JsonElement jelem = gson.fromJson(jsonRes, JsonElement.class);
            JsonArray arr = jelem.getAsJsonArray();

            List<CarDTO> carList = new ArrayList();

            for (JsonElement j : arr) {
                int price = getFieldValueAsInt(j, "price");
                String color = getFieldValueAsString(j, "color");
                int size = getFieldValueAsInt(j, "size");
                String image = getFieldValueAsString(j, "image");
                String purchaseUrl = getFieldValueAsString(j, "purchaseUrl");

                JsonElement manObject = getFieldValueAsJsonObject(j, "Manufacturer");
                String name = getFieldValueAsString(manObject, "name");
                String model = getFieldValueAsString(manObject, "model");

                CarDTO car = new CarDTO(name, model, price, color, size, image, purchaseUrl);

                JsonArray extraArr = j.getAsJsonObject().get("extras").getAsJsonArray();

                for (JsonElement jsonElement : extraArr) {
                    String label = getFieldValueAsString(jsonElement, "label");
                    String value = getFieldValueAsString(jsonElement, "value");
                    car.extra.add(new CarExtraDTO(label, value));
                }

                carList.add(car);
            }
           
            
            return carList;
        } catch (Exception e) {
            return new ArrayList();
        }
    }

    public void checkIfFirst() {
        if (first) {
            first = false;
            reqUrl += "?";
        }
        reqUrl += "&";

    }

    

    public void setReqUrl(String reqUrl) {
        this.reqUrl = reqUrl;
    }
    
    

}
