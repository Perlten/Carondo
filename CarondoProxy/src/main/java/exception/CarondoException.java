package exception;


public class CarondoException extends Exception {
    
    private int errorCode;
    private String errorTitle;
    private String errorMessage;

    public CarondoException(int errorCode, String errorTitle, String errorMessage) {
        this.errorCode = errorCode;
        this.errorTitle = errorTitle;
        this.errorMessage = errorMessage;
    }
    
    public CarondoException(String errorTitle, String errorMessage){
        this(400, errorTitle, errorMessage);
    }

    public CarondoException() {
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String getErrorTitle() {
        return errorTitle;
    }
}
