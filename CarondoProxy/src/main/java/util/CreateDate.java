package util;

import entity.stat.DateStat;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import org.joda.time.DateTime;

public class CreateDate {

    public static void main(String[] args) {
        for (int i = 1; i < 8; i++) {
            DateTime dt = new DateTime();
            dt = dt.withDayOfWeek(i);
            String day = dt.dayOfWeek().getAsText();

            EntityManager em = Persistence.createEntityManagerFactory("pu").createEntityManager();
            DateStat stat;
            try {
                TypedQuery<DateStat> q = em.createNamedQuery("Date.findByName", DateStat.class);
                q.setParameter("day", day);
                stat = q.getSingleResult();
                stat.add1ToValue();

                em.getTransaction().begin();
                em.merge(stat);
                em.getTransaction().commit();

            } catch (NoResultException e) {
                stat = new DateStat(day);
                em.getTransaction().begin();
                em.persist(stat);
                em.getTransaction().commit();
            } finally {
                em.close();
            }
        }
    }

}
