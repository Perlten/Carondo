/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import entity.Employee;
import entity.Role;
import exception.CarondoException;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author perlt
 */
public class LoginFacadeTest {

    private EntityManager em;

    private Employee emp1;
    private Employee emp2;
    private Employee emp3;
    private Employee emp4;

    @Before
    public void setUp() {
        emp1 = new Employee("Nikolai", "Perlt", "Perlt@gmail.com", "admin", Role.admin);
        emp2 = new Employee("Ralle", "Wauw", "WauwWauwWauw@gmail.com", "test", Role.statistician);
        emp3 = new Employee("Jesper", "Jeppe", "enig@gmail.com", "hej", Role.statistician);
        emp4 = new Employee("Adam", "Harry", "harry@gmail.com", "hp", Role.admin);

        em = Persistence.createEntityManagerFactory("testpu").createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(emp1);
            em.persist(emp2);
            em.persist(emp3);
            em.persist(emp4);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    @After
    public void tearDown() {
        em = Persistence.createEntityManagerFactory("testpu").createEntityManager();

        try {
            em.getTransaction().begin();
            Query q = em.createNativeQuery("truncate table EMPLOYEE");
            q.executeUpdate();
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    /**
     * Test of getEmployee method, of class LoginFacade.
     */
    @Test
    public void testGetEmployee() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        Employee res = f.getEmployee(emp1.getEmail());
        assertEquals(emp1, res);
        
    }

    @Test(expected = CarondoException.class)
    public void getNonExistentEmployee() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        f.getEmployee("fail@gmail.com");
        fail();
    }

    /**
     * Test of login method, of class LoginFacade.
     */
    @Test
    public void testSuccessfulLogin() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        Employee emp = f.login(emp2.getEmail(), "test");
        assertNotNull(emp);
    }

    @Test(expected = CarondoException.class)
    public void testFailLogin() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        f.login(emp2.getEmail(), "test23");
    }

    /**
     * Test of createEmployee method, of class LoginFacade.
     */
    @Test
    public void testCreateEmployee() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        Employee emp = new Employee("TEST", "TEST", "TEST", "TEST", Role.admin);
        f.createEmployee(emp);
        int expected = 5;
        int res = testSize();
        assertEquals(expected, res);
    }

    @Test(expected = CarondoException.class)
    public void testCreateEmployeeWithExistentEmail() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        Employee emp = new Employee("TEST", "TEST", emp1.getEmail(), "TEST", Role.admin);
        f.createEmployee(emp);
        fail();
    }

    @Test(expected = CarondoException.class)
    public void testCreateEmployeeWithNull() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        f.createEmployee(null);
        fail();
    }

    /**
     * Test of editEmployee method, of class LoginFacade.
     */
    @Test
    public void testEditEmployee() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        String firstName = "EditPerson";
        Employee emp = f.getEmployee(emp3.getEmail());
        emp.setFirstName(firstName);
        f.editEmployee(emp);
        emp = f.getEmployee(emp3.getEmail());
        assertEquals(emp.getFirstName(), firstName);
    }

    @Test(expected = CarondoException.class)
    public void testEditEmployeeWithNull() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        f.editEmployee(null);
        fail();
    }

    @Test
    public void testGetEmployees() throws Exception {
        EmployeeFacade f = getEmployeeFacade();
        int expected = 4;
        int res = f.getEmployees().size();
        assertEquals(expected, res);
    }

    private int testSize() {
        em = Persistence.createEntityManagerFactory("testpu").createEntityManager();

        try {
            TypedQuery<Employee> q = em.createQuery("SELECT e FROM Employee e", Employee.class);
            return q.getResultList().size();
        } finally {
            em.close();
        }
    }

    private EmployeeFacade getEmployeeFacade() {
        return new EmployeeFacade(Persistence.createEntityManagerFactory("testpu"));
    }
}
