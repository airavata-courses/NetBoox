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
	
	// Commenting as these services discovers getAuthorById service
	// CuratorFramework must be started first in order to do that.
	/*
	@Test
	public void getBooksTest() {
		BookDAO dao = new BookDAO();
		assertNotNull(dao.getBooks());
	}
	
	@Test
	public void getBookById() {
		BookDAO dao = new BookDAO();
		assertNotNull(dao.getBookById("5bce2a0ceb701011b6151a7b"));
	}
	*/
}
