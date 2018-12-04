/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.CarDTO;
import facade.SwapiFacade;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Jesper
 */
@Path("swapi")
public class Swapi {

    SwapiFacade swapiFacade;
    private Gson gson;

    public Swapi() {
        this.swapiFacade = new SwapiFacade();
        this.gson = new GsonBuilder().setPrettyPrinting().create();
    }
    
    @Context
    private UriInfo context;
    
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSwapiCar(@PathParam("id") int id) throws Exception {
      return Response.ok().entity(gson.toJson(swapiFacade.swapiGetter(id))).type(MediaType.APPLICATION_JSON).build();
    }

   
}
