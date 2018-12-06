/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import entity.stat.PriceRangeStat;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

/**
 *
 * @author adamlass
 */
public class CreatePriceRanges {

    public static void main(String[] args) {

        EntityManager em = Persistence.createEntityManagerFactory("pu").createEntityManager();

        try {
            for (int i = 0; i < 3000000; i += 10000) {
                em.getTransaction().begin();
                em.persist(new PriceRangeStat(0, i, i + 10000));
                em.getTransaction().commit();
            }
        } finally {
            em.close();
        }
    }
}
