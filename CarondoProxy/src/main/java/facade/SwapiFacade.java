package facade;

import callable.SwApiConverter;
import static callable.SwApiConverter.CARLIST;
import dto.CarDTO;

public class SwapiFacade {

    public CarDTO swapiGetter(int id) throws Exception {

        if (CARLIST.isEmpty()) {
            SwApiConverter swapi = new SwApiConverter("", "", 0, 0, 0, 0);
            swapi.fetchData("https://swapi.co/api/vehicles/");
        }
        return CARLIST.get(id);
    }

}
