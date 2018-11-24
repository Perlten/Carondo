package dto;


public class SwApiDTO {
    public String name;

    public SwApiDTO(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "SwApiDTO{" + "name=" + name + '}';
    }
}
