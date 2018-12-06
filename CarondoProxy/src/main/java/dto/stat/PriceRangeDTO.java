/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto.stat;

import entity.stat.PriceRangeStat;

/**
 *
 * @author adamlass
 */
public class PriceRangeDTO {
    public int end;
    public int value;

    public PriceRangeDTO(PriceRangeStat t) {
        this.end = t.getEnd();
        this.value = t.getValue();
    }
    
}
