
package dto;

import java.util.ArrayList;
import java.util.List;

public class CarDTO {

public String brand;
public String model;
public int price;
public String color;
public int size;
public String imageURL;
public String purchaseURL;
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

    
    // Used in swapi
    public CarDTO(String brand, String model, int price, String color, int size, String imageURL) {
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.color = color;
        this.size = size;
        this.imageURL = imageURL;
    }

    
    
    @Override
    public String toString() {
        return "CarDTO{" + "brand=" + brand + ", model=" + model + ", price=" + price + ", color=" + color + ", size=" + size + ", imageURL=" + imageURL + ", purchaseURL=" + purchaseURL + ", extra=" + extra + '}';
    }

    public void setPurchaseURL(String purchaseURL) {
        this.purchaseURL = purchaseURL;
    }

    


    
}
