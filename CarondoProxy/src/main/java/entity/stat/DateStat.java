package entity.stat;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@NamedQuery(name = "Date.findByName", query = "SELECT d FROM DateStat d WHERE d.day = :day")
@Entity
public class DateStat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String day;
    private int value;

    public DateStat() {
    }

    public DateStat(String day) {
        this.day = day;
        this.value = 1;
    }
    
    public void add1ToValue(){
        value++;
    }

    public String getDay() {
        return day;
    }

    public int getValue() {
        return value;
    }

    public Integer getId() {
        return id;
    }

}
