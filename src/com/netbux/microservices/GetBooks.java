package com.netbux.microservices;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
	
	@GET
	@Path("/getBookById/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBookById(@PathParam("id") String id)  {
		BookDAO dao = new BookDAO();
		Book book = dao.getBookById(id);
		return Response.ok(book).build();
	}
}
