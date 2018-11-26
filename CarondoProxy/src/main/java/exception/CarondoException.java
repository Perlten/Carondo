package exception;


public class CarondoException extends Exception {
    
    private int errorCode;
    private String msg;
    
    public CarondoException(int errorCode, String msg) {
        this.errorCode = errorCode;
        this.msg = msg;
    }

    public CarondoException() {
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getMsg() {
        return msg;
    }
}
