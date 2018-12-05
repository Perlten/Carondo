/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import entity.RestUrl;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;


public class CreateURLs {
  
    
    public static void main(String[] args) {
        
         EntityManager em = Persistence.createEntityManagerFactory("pu").createEntityManager();
        RestUrl r1 = new RestUrl("Jesper Inc", "https://jrusbjerg.dk/ExamCarBackendJesper/api/car");
        RestUrl r2 = new RestUrl("Perlt", "https://perlt.net/CarondoBackend/api/car?");
        RestUrl r3 = new RestUrl("Waauwe", "https://rasmushelsgaun.dk/Waauwe/api/waauwe");
        RestUrl r4 = new RestUrl("LRB", "https://adamlass.com/LarsRoyalityBrand/api/cars");
        RestUrl r5 = new RestUrl("Swapi", "https://swapi.co/api/vehicles/");
        RestUrl r6 = new RestUrl("test", "test");
        em.getTransaction().begin();
        em.persist(r1);
        em.persist(r2);
        em.persist(r3);
        em.persist(r4);
        em.persist(r5);
        em.persist(r6);
        em.getTransaction().commit();
        em.close();
        
    }
}
