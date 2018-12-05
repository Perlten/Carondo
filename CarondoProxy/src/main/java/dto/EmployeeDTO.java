package dto;

import entity.Employee;


public class EmployeeDTO {
    
    public Integer id;
    public String firstName, lastName, email;
    public String role;

    public EmployeeDTO(Employee emp) {
        this.id = emp.getId();
        this.firstName = emp.getFirstName();
        this.lastName = emp.getLastName();
        this.email = emp.getEmail();
        this.role = emp.getRole().toString();
    }

}
