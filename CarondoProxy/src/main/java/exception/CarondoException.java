package exception;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class CarondoException extends Exception implements ExceptionMapper<CarondoException> {

    private int errorCode;
    private String errorTitle;
    private String errorMessage;

    public CarondoException(int errorCode, String errorTitle, String errorMessage) {
        this.errorCode = errorCode;
        this.errorTitle = errorTitle;
        this.errorMessage = errorMessage;
    }

    public CarondoException(String errorTitle, String errorMessage) {
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

    @Override
    public Response toResponse(CarondoException exception) {
        return makeErrRes(exception.getErrorTitle(), exception.getErrorMessage(), exception.getErrorCode());
    }

    public static Response makeErrRes(String errorTitle, String errorMessage, int status) {
        JsonObject jo = new JsonObject();
        jo.addProperty("errorTitle", errorTitle);
        jo.addProperty("errorMessage", errorMessage);
        if (status != 0) {
            jo.addProperty("errorCode", status);
        }
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(jo);
        return Response.status(status).entity(json).type(MediaType.APPLICATION_JSON).build();
    }
}
