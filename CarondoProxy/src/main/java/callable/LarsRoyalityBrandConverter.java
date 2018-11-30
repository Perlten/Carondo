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
import exception.CarondoException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

/**
 *
 * @author adamlass
 */
public class LarsRoyalityBrandConverter extends SharedProps implements Callable<List<CarDTO>> {

    private final String URI = "https://adamlass.com/LarsRoyalityBrand/api/cars";

    public LarsRoyalityBrandConverter(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        super(color, eco, minSize, maxSize, minPrice, maxPrice);
    }

    @Override
    public List<CarDTO> call() throws Exception {
        try {
            //building request URL based on inputs
            String URL = URI;

            List<String> params = new ArrayList<>();

            if (color != null) {
                params.add("colors=" + color);
            }
            if (minPrice > 0) {
                params.add("min_price=" + minPrice);
            }
            if (maxPrice > 0) {
                params.add("max_price=" + maxPrice);
            }
            if (minSize > 0) {
                params.add("min_size=" + minSize);
            }
            if (maxSize > 0) {
                params.add("max_size=" + maxSize);
            }

            if (eco != null) {
                if (eco.equals("yes")) {
                    params.add("min_eco_rating=A");
                    params.add("min_km_liter=14");
                    params.add("energy_types=Electric,Hybrid");
                } else if (eco.equals("no")) {
                    params.add("energy_types=Diesel");
                }
            }

            if (!params.isEmpty()) {
                URL += "?" + params.get(0);
                for (int i = 1; i < params.size(); i++) {
                    URL += "&" + params.get(i);
                }
            }

            //Making request
            String jsonRes = new URLRequest().request(URL);

            //Loading response
            JsonElement jelem = gson.fromJson(jsonRes, JsonElement.class);
            JsonArray arr = jelem.getAsJsonArray();

            List<CarDTO> carList = new ArrayList();
            for (JsonElement j : arr) {
                //Reading values
                //Standards
                String brand = "Lars Royality Brand";
                String model = getFieldValueAsString(j, "model");
                int price = (int) getFieldValueAsInt(j, "price");
                int seats = getFieldValueAsInt(j, "seats");
                String color = getFieldValueAsString(j, "color");
                String imageUrl = getFieldValueAsString(j, "imageURL");
                String purchaseURL = getFieldValueAsString(j, "purchaseURL");
                //Extras
                String ecoRating = getFieldValueAsString(j, "ecoRating");
                String energyType = getFieldValueAsString(j, "energyType");
                String letherType = getFieldValueAsString(j, "letherType");
                String engineSize = getFieldValueAsString(j, "engineSize");
                String weight = getFieldValueAsString(j, "weight");
                String height = getFieldValueAsString(j, "height");
                String width = getFieldValueAsString(j, "width");
                String length = getFieldValueAsString(j, "length");
                String volumen = getFieldValueAsString(j, "volumen");
                String rpm = getFieldValueAsString(j, "rpm");
                String cylinders = getFieldValueAsString(j, "cylinders");
                String horsepower = getFieldValueAsString(j, "horsepower");
                String kmLiter = getFieldValueAsString(j, "kmLiter");
                boolean turbo = getFieldValueAsBoolean(j, "turbo");
                String turboString = turbo ? "Yes" : "No";

                //Creating car object
                CarDTO car = new CarDTO(brand, model, price, color, seats, imageUrl, purchaseURL);
                car.extra.add(new CarExtraDTO("Eco Rating", ecoRating));
                car.extra.add(new CarExtraDTO("Energy Type", energyType));
                car.extra.add(new CarExtraDTO("Leather Type", letherType));
                car.extra.add(new CarExtraDTO("Engine Size", engineSize));
                car.extra.add(new CarExtraDTO("Weight", weight + " Kg"));
                car.extra.add(new CarExtraDTO("Height", height + " m"));
                car.extra.add(new CarExtraDTO("Width", width + " m"));
                car.extra.add(new CarExtraDTO("Length", length + " m"));
                car.extra.add(new CarExtraDTO("Volume", volumen + " m3"));
                car.extra.add(new CarExtraDTO("RPM", rpm));
                car.extra.add(new CarExtraDTO("Cylinders", cylinders));
                car.extra.add(new CarExtraDTO("HorsePower", horsepower));
                car.extra.add(new CarExtraDTO("Km/Liter", kmLiter));
                car.extra.add(new CarExtraDTO("Has Turbo:", turboString));

                //Adding car to list
                carList.add(car);
            }
            return carList;

        } catch (Exception e) {
            return new ArrayList();
        }

    }

}
