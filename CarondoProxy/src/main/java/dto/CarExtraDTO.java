/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author Jesper
 */
public class CarExtraDTO {
    
    String label;
    String value;

    public CarExtraDTO(String label, String value) {
        this.label = label;
        this.value = value;
    }

    @Override
    public String toString() {
        return "CarExtraDTO{" + "label=" + label + ", value=" + value + '}';
    }
    
    
    
}
