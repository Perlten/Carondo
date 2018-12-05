package entity.stat;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@NamedQuery(name="Brand.findByName", query="SELECT b FROM BrandStat b where b.brand = :brand") 
@Entity
public class BrandStat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true, nullable = false)
    private String brand;
    private int value;

    public BrandStat() {
    }

    public BrandStat(String brand) {
        this.brand = brand;
        this.value = 1;
    }

    public void add1ToValue(){
        value++;
    }

    public String getBrand() {
        return brand;
    }
    
    public int getValue() {
        return value;
    }

    public Integer getId() {
        return id;
    }


}
