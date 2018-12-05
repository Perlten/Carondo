/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.stat.StatResponseDTO;
import facade.StatFacade;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author perlt
 */
@Path("stat")
public class Stat {

    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private StatFacade facade = new StatFacade();

    @Context
    private UriInfo context;

    @GET
    @RolesAllowed({"admin", "statistician"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStats() {
        StatResponseDTO responseDTO = facade.getAllStats();
        String json = gson.toJson(responseDTO);

        return Response
                .status(200)
                .entity(json)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
