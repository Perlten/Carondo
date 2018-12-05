/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.RestUrl;
import facade.RestUrlFacade;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Jesper
 */
@Path("urls")
public class UrlResource {

    RestUrlFacade facade;
    Gson gson;
    
    @Context
    private UriInfo context;

    public UrlResource() {
        facade = new RestUrlFacade();
        this.gson = new GsonBuilder().setPrettyPrinting().create();
    }

    
    @GET
   // @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUrls() {
    return Response.ok().entity(facade.getUrls()).type(MediaType.APPLICATION_JSON).build();
    }


    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUrl(String json) {
        
        RestUrl r = gson.fromJson(json, RestUrl.class);
        facade.editUrl(r);
        String sendBack = gson.toJson(r);
        
    return Response.ok().entity(sendBack).type(MediaType.APPLICATION_JSON).build();
    }
}
