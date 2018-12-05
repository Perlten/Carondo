package dto.stat;

import entity.stat.ColorStat;


public class ColorDTO {

    public String color;
    public int value;

    public ColorDTO(ColorStat color) {
        this.color = color.getColor();
        this.value = color.getValue();
    }
    
    
}
