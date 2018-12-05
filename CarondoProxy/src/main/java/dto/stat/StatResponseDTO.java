package dto.stat;

import java.util.List;


public class StatResponseDTO {
    
    public List<BrandDTO> brandList;
    public List<ColorDTO> colorList;
    public List<DateDTO> dateList;

    public StatResponseDTO(List<BrandDTO> brandList, List<ColorDTO> colorList, List<DateDTO> dateList) {
        this.brandList = brandList;
        this.colorList = colorList;
        this.dateList = dateList;
    }
}
