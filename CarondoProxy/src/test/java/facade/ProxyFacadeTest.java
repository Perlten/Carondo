/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import dto.CarDTO;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author perlt
 */
public class ProxyFacadeTest {
    
    
    /**
     * Test of getCars method, of class ProxyFacade.
     */
    @Test
    public void testGetCars() throws Exception {
        System.out.println("getCars");
        String color = "black";
        String eco = "all";
        int minSize = 1;
        int maxSize = 4;
        int minPrice = 1;
        int maxPrice = 3000000;
        ProxyFacade instance = new ProxyFacade();
        List<CarDTO> result = instance.getCars(color, eco, minSize, maxSize, minPrice, maxPrice);
        assertTrue(!result.isEmpty());
         
    }
    
}
