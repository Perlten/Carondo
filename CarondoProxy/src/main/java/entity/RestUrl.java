/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Persistence;


@Entity
public class RestUrl implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String company;
    private String url;

    public RestUrl(String company, String url) {
        this.company = company;
        this.url = url;
    }

    public RestUrl() {
    }
    
    
    
    public Integer getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public String toString() {
        return "RestUrl{" + "id=" + id + ", company=" + company + ", url=" + url + '}';
    }
    
    
    
    public static void main(String[] args) {
       Persistence.generateSchema("pu", null);
        EntityManager em = Persistence.createEntityManagerFactory("pu").createEntityManager();
//        RestUrl r1 = new RestUrl("Jesper Inc", "https://jrusbjerg.dk/ExamCarBackendJesper/api/car");
//        RestUrl r2 = new RestUrl("Perlt", "https://perlt.net/CarondoBackend/api/car?");
//        RestUrl r3 = new RestUrl("Waauwe", "https://rasmushelsgaun.dk/Waauwe/api/waauwe");
//        RestUrl r4 = new RestUrl("LRB", "https://adamlass.com/LarsRoyalityBrand/api/cars");
//        RestUrl r5 = new RestUrl("Swapi", "https://swapi.co/api/vehicles/");
        RestUrl r5 = new RestUrl("test", "test");
       
        em.getTransaction().begin();
//        em.persist(r1);
//        em.persist(r2);
//        em.persist(r3);
//        em.persist(r4);
        em.persist(r5);
        em.getTransaction().commit();
        
        em.close();
        
    }
}
