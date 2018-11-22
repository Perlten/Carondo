
package dto;

import java.util.ArrayList;
import java.util.List;

public class CarDTO {

private String brand;
private String model;
private int price;
private String color;
private int size;
private String imageURL;
private String purchaseURL;
public List<CarExtraDTO> extra = new ArrayList();

    public CarDTO(String brand, String model, int price, String color, int size, String imageURL, String purchaseURL) {
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.color = color;
        this.size = size;
        this.imageURL = imageURL;
        this.purchaseURL = purchaseURL;
    }

    @Override
    public String toString() {
        return "CarDTO{" + "brand=" + brand + ", model=" + model + ", price=" + price + ", color=" + color + ", size=" + size + ", imageURL=" + imageURL + ", purchaseURL=" + purchaseURL + ", extra=" + extra + '}';
    }



    
}
