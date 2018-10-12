package com.netbux.dao;

import static org.junit.Assert.*;

import org.junit.Test;

import com.netbux.dao.BookDAO;

public class BookDAOTest {

	@Test
	public void connectionTest() {
		BookDAO dao = new BookDAO();
		assertNotNull(dao.getMongoClient());
	}
	
	@Test
	public void getBooksTest() {
		BookDAO dao = new BookDAO();
		assertNotNull(dao.getBooks());
	}

}
