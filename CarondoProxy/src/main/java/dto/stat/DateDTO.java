package dto.stat;

import entity.stat.DateStat;


public class DateDTO {
    
    public String day;
    public int value;

    public DateDTO(DateStat date) {
        this.day = date.getDay();
        this.value = date.getValue();
    }

}
