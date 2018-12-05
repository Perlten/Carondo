package facade;

import entity.RestUrl;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

public final class RestUrlFacade {

 private EntityManagerFactory emf;

    public RestUrlFacade() {
        this.emf = Persistence.createEntityManagerFactory("pu");
    }
    
        private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
        
   
        public List<RestUrl> getUrls(){
            EntityManager em = getEntityManager();
            try{
            TypedQuery<RestUrl> q = em.createQuery("SELECT u FROM RestUrl u", RestUrl.class);
            return q.getResultList();
            }catch(Exception e){
                System.out.println(e.getMessage());
            }finally {
                em.close();
            }
            return null;
        }
        
        public RestUrl getUrl(String company){
            EntityManager em = getEntityManager();
            try{
            TypedQuery<RestUrl> q = em.createQuery("SELECT u FROM RestUrl u WHERE u.company =:company", RestUrl.class);
            q.setParameter("company", company);
            return q.getSingleResult();
            }catch(Exception e){
                System.out.println(e.getMessage());
            }finally {
                em.close();
            }
            return null;
        }
        
        public void editUrl(RestUrl url){
            EntityManager em = getEntityManager();
            try{
                em.getTransaction().begin();
                em.merge(url);
                em.getTransaction().commit();
            }catch(Exception e){
                // throw exception?
            }finally {
                em.close();
            }
        }

    
        
        public static void main(String[] args) {
        RestUrlFacade x = new RestUrlFacade();
            System.out.println(x.getUrl("Swapi"));
    }
}
