package facade;

import entity.Employee;
import exception.CarondoException;
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

    public Employee getEmployee(String email) throws CarondoException {
        EntityManager em = getEntityManager();

        try {
            TypedQuery<Employee> q = em.createQuery("SELECT e FROM Employee e WHERE e.email = :email", Employee.class);
            q.setParameter("email", email);
            Employee emp = q.getSingleResult();
            return emp;
        } catch (Exception e) {
            throw new CarondoException("Could not find employee", "Could not find the given employee");
        } finally {
            em.close();
        }
    }

    public Employee login(String email, String password) throws CarondoException {
        EntityManager em = getEntityManager();
        try {
            Employee emp = getEmployee(email);
            if (emp.verifyLogin(password)) {
                return emp;
            }
        } finally {
            em.close();
        }
        throw new CarondoException("Login Error", "Could not login with the given email and password");
    }

    public Employee createEmployee(Employee emp) throws CarondoException {
        EntityManager em = getEntityManager();

        try {
            em.getTransaction().begin();
            em.persist(emp);
            em.getTransaction().commit();
        } catch (Exception e) {
            throw new CarondoException("Could not create employee", "Could not create employee");
        } finally {
            em.close();
        }
        return emp;
    }

    public Employee editEmployee(Employee emp) throws CarondoException {
        EntityManager em = getEntityManager();

        try {
            em.getTransaction().begin();
            em.merge(emp);
            em.getTransaction().commit();
        } catch (Exception e) {
            throw new CarondoException("Could not update employee", "Could not update employee");
        } finally {
            em.close();
        }
        return emp;
    }

    public List<Employee> getEmployees() {
        EntityManager em = getEntityManager();
        try {
            TypedQuery<Employee> q = em.createQuery("SELECT e FROM Employee e", Employee.class);
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

}
