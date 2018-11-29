package facade;

import callable.JesperConverter;
import callable.LarsRoyalityBrandConverter;
import callable.PerltConverter;
import callable.RasmusConverter;
import callable.SwApiConverter;
import dto.CarDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ProxyFacade {

    public List<CarDTO> getCars(String color, String eco, int minSize,
            int maxSize, int minPrice, int maxPrice) throws InterruptedException, ExecutionException {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        List<Future<List<CarDTO>>> futures = new ArrayList();

        List<Callable> callables = new ArrayList();

        callables.add(new PerltConverter(color, eco, minSize, maxSize, minPrice, maxPrice));
        callables.add(new LarsRoyalityBrandConverter(color, eco, minSize, maxSize, minPrice, maxPrice));
        callables.add(new JesperConverter(color, eco, minSize, maxSize, minPrice, maxPrice));
        callables.add(new RasmusConverter(color, eco, minSize, maxSize, minPrice, maxPrice));
        callables.add(new SwApiConverter(color, eco, minSize, maxSize, minPrice, maxPrice));

        for (Callable callable : callables) {
            futures.add(pool.submit(callable));
        }

        List<CarDTO> cars = new ArrayList();
        for (Future<List<CarDTO>> f : futures) {
            cars.addAll(f.get());
        }
        return cars;
    }

}
