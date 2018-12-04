package entity.stat;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@NamedQuery(name="Color.findByName", query="SELECT c FROM ColorStat c where c.color = :color") 
@Entity
public class ColorStat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String color;
    private int value;

    public ColorStat() {
    }
    
    public ColorStat(String color){
        this.color = color;
        this.value = 1;
    }
    
    public void add1ToValue(){
        value++;
    }

    public String getColor() {
        return color;
    }

    public int getValue() {
        return value;
    }

    public Integer getId() {
        return id;
    }

}
