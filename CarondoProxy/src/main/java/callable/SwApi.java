package callable;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import dto.CarDTO;
import dto.CarExtraDTO;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.stream.Collectors;

public class SwApi extends SharedProps implements Callable<List<CarDTO>> {

    private static LocalDateTime lastFetch = LocalDateTime.now();
    private static final String URL = "https://swapi.co/api/vehicles/";
    private static final String IMAGEURL = "https://vignette.wikia.nocookie.net/starwars/images/3/3c/Px-10-tur.jpg/revision/latest?cb=20100528131240";
    private static final List<CarDTO> CARLIST = new ArrayList<>();

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public SwApi(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        super(color, eco, minSize, maxSize, minPrice, maxPrice);
    }

    @Override
    public List<CarDTO> call() {
        try {
            shouldFetch();
            return filterCars();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private void shouldFetch() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        //TODO: Change to days!
        LocalDateTime lastFetchPlus1Day = lastFetch.plusDays(1);
        if (lastFetchPlus1Day.isBefore(now) || CARLIST.isEmpty()) {
            lastFetch = now;
            CARLIST.clear();
            fetchData(URL);
        }
    }

    private void fetchData(String url) throws Exception {
        String data = new URLRequest().request(url);
        converData(data);
    }

    private void converData(String data) throws Exception {
        JsonElement je = gson.fromJson(data, JsonElement.class);
        JsonArray arrayData = je.getAsJsonObject().getAsJsonArray("results");
        String next = getFieldValueAsString(je, "next");

        for (JsonElement j : arrayData) {
            String name = getFieldValueAsString(j, "name");
            String model = getFieldValueAsString(j, "model");
            String passengers = getFieldValueAsString(j, "passengers");
            int size = getFieldValueAsInt(j, "crew");
            String vClass = getFieldValueAsString(j, "vehicle_class");
            String manu = getFieldValueAsString(j, "manufacturer");
            String priceString = getFieldValueAsString(j, "cost_in_credits");
            String length = getFieldValueAsString(j, "length");
            String purchaseURL = getFieldValueAsString(j, "url");

            int price = 0;
            if (!priceString.equals("unknown")) {
                price = Integer.parseInt(priceString);
            }
            CarDTO car = new CarDTO(manu, model, price, "Unknown", size, IMAGEURL, purchaseURL);
            car.extra.add(new CarExtraDTO("Name", name));
            car.extra.add(new CarExtraDTO("Vehicle Class", vClass));
            car.extra.add(new CarExtraDTO("Length", length));
            car.extra.add(new CarExtraDTO("Passengers", passengers));

            CARLIST.add(car);
        }

        if (next != null) {
            fetchData(next);
        }
    }

    private List<CarDTO> filterCars() {
        List<CarDTO> list = CARLIST.stream()
                .filter(c -> c.price >= minPrice)
                .filter(c -> c.price <= maxPrice)
                .filter(c -> c.size >= minSize)
                .filter(c -> c.size <= maxSize)
                .collect(Collectors.toList());
        return list;
    }

}
