package com.netbux.microservices;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.netbux.dao.AuthorDAO;
import com.netbux.pojos.Author;

@Path("/authors")
public class AuthorServices {
	
	@GET
	@Path("/getAuthors")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAuthors() {
		AuthorDAO dao = new AuthorDAO();
		ArrayList<Author> authorList = dao.getAuthors();
		System.out.println("getAuthors served!");
		return Response.ok(authorList).build();
	}
	
	@GET
	@Path("/getAuthorById/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAuthorById(@PathParam("id") String id) {
		AuthorDAO dao = new AuthorDAO();
		Author author = dao.getAuthorById(id);
		System.out.println("getAuthorById served!");
		return Response.ok(author).build();
	}
}
