package util;

import entity.Employee;
import entity.RestUrl;
import entity.Role;
import exception.CarondoException;
import facade.EmployeeFacade;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;


public class CreateUsers {
    
    public static void main(String[] args) throws CarondoException {
        EmployeeFacade f = new EmployeeFacade();
        Employee emp = new Employee("Nikolai", "Perlt", "perlt@gmail.com", "admin", Role.admin);
        f.createEmployee(emp);
        
       
        
    }
}
