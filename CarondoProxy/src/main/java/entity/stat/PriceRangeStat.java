/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity.stat;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author adamlass
 */
@Entity
public class PriceRangeStat implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int value;
    
    private int start;
    private int end;

    public Long getId() {
        return id;
    }

    public PriceRangeStat() {
    }

    public PriceRangeStat(int value, int start, int end) {
        this.value = value;
        this.start = start;
        this.end = end;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getValue() {
        return value;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }

    public void countUp() {
        this.value++;
    }
    
    

   
    
    

    
    
    
    
    
}
