package com.netbux.microservices;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.netbux.dao.BookDAO;
import com.netbux.pojos.Book;

@Path("/getbooks")
public class GetBooks {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllBooks() {
			BookDAO dao = new BookDAO();
			ArrayList<Book> bookList = dao.getBooks();
			return Response.ok(bookList).build();		
	}
}
