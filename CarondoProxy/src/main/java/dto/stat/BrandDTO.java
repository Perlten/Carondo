package dto.stat;

import entity.stat.BrandStat;


public class BrandDTO {
    
    public String brand;
    public int value;

    public BrandDTO(BrandStat brand) {
        this.brand = brand.getBrand();
        this.value = brand.getValue();
    }
    

}
