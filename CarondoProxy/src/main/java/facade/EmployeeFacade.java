package facade;

import entity.Employee;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

public class EmployeeFacade {
    
    private EntityManagerFactory emf;

    public EmployeeFacade() {
        this.emf = Persistence.createEntityManagerFactory("pu");
    }

    public EmployeeFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public Employee getEmployee(String email) {
        EntityManager em = getEntityManager();

        try {
            TypedQuery<Employee> q = em.createQuery("SELECT e FROM Employee e WHERE e.email = :email", Employee.class);
            q.setParameter("email", email);
            return q.getSingleResult();
        } finally {
            em.close();
        }
    }

    public Employee login(String email, String password) {
        return null;
    }

    public Employee createEmployee(Employee emp) {
        
        return null;
    }

    public Employee editEmployee(Employee emp) {
        return null;
    }
    
    public List<Employee> getEmployees(){
        return null;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    

}
