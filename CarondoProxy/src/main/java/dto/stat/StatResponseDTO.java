package dto.stat;

import java.util.List;


public class StatResponseDTO {
    
    public List<BrandDTO> brandList;
    public List<ColorDTO> colorList;
    public List<DateDTO> dateList;
    public List<PriceRangeDTO> priceRangeList;

    public StatResponseDTO(List<BrandDTO> brandList, List<ColorDTO> colorList, List<DateDTO> dateList, List<PriceRangeDTO> priceRangeList) {
        this.brandList = brandList;
        this.colorList = colorList;
        this.dateList = dateList;
        this.priceRangeList = priceRangeList;
    }
}
