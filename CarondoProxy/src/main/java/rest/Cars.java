package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.CarDTO;
import facade.ProxyFacade;
import facade.StatFacade;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("cars")
public class Cars {

    private ProxyFacade facade;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    public Cars() {
        facade = new ProxyFacade();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response resultCars(
            @QueryParam("color") String color,
            @QueryParam("eco") String eco,
            @QueryParam("min_size") int minSize,
            @QueryParam("max_size") int maxSize,
            @QueryParam("min_price") int minPrice,
            @QueryParam("max_price") int maxPrice
    ) throws Exception {
        if (checkParams(color, eco, minSize, maxSize, minPrice, maxPrice)) {
            throw new Exception();
        }
        
        StatFacade statFacade = new StatFacade();
        statFacade.updateColorStat(color.split(","));
        statFacade.saveCurrentDate();

        List<CarDTO> carList = facade.getCars(color, eco, minSize, maxSize, minPrice, maxPrice);
        String json = gson.toJson(carList);

        return Response
                .ok()
                .entity(json)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    private boolean checkParams(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        return (color == null || eco == null || minSize == 0
                || maxSize == 0 || minPrice == 0 || maxPrice == 0);
    }

}
