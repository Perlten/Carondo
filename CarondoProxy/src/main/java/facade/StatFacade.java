package facade;

import entity.stat.BrandStat;
import entity.stat.ColorStat;
import entity.stat.DateStat;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import org.joda.time.DateTime;

public class StatFacade {

    private EntityManagerFactory emf;

    public StatFacade() {
        this.emf = Persistence.createEntityManagerFactory("pu");
    }

    public StatFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public void updateBrandStat(String brand) {
        EntityManager em = getEm();
        BrandStat stat;
        try {
            TypedQuery<BrandStat> q = em.createNamedQuery("Brand.findByName", BrandStat.class);
            q.setParameter("brand", brand);
            stat = q.getSingleResult();
            stat.add1ToValue();

            em.getTransaction().begin();
            em.merge(stat);
            em.getTransaction().commit();

        } catch (NoResultException e) {
            stat = new BrandStat(brand);
            em.getTransaction().begin();
            em.persist(stat);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void updateColorStat(String color) {
        EntityManager em = getEm();
        ColorStat stat;
        try {
            TypedQuery<ColorStat> q = em.createNamedQuery("Color.findByName", ColorStat.class);
            q.setParameter("color", color);
            stat = q.getSingleResult();
            stat.add1ToValue();

            em.getTransaction().begin();
            em.merge(stat);
            em.getTransaction().commit();

        } catch (NoResultException e) {
            stat = new ColorStat(color);
            em.getTransaction().begin();
            em.persist(stat);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void saveCurrentDate() {
        DateTime dt = new DateTime();
        String day = dt.dayOfWeek().getAsText();
        
        EntityManager em = getEm();
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

    public void updateColorStat(String[] colors) {
        if (colors[0].equals("all")) {
            colors = new String[]{"black", "red", "green", "blue", "silver", "white"};
        }
        for (String color : colors) {
            updateColorStat(color);
        }
    }

    private EntityManager getEm() {
        return emf.createEntityManager();
    }
}
