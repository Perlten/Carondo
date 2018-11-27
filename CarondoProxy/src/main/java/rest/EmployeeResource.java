/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.nimbusds.jose.JOSEException;
import dto.LoginDTO;
import entity.Employee;
import exception.CarondoException;
import facade.EmployeeFacade;
import facade.TokenFacade;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author perlt
 */
@Path("employee")
public class EmployeeResource {

    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(String json) throws CarondoException, JOSEException {
        LoginDTO dto = gson.fromJson(json, LoginDTO.class);

        EmployeeFacade f = new EmployeeFacade();
        Employee emp = f.login(dto.email, dto.password);
        String token = new TokenFacade().createToken(emp);

        JsonObject jo = new JsonObject();
        jo.addProperty("token", token);

        return Response
                .status(Response.Status.OK)
                .entity(gson.toJson(jo))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

}
