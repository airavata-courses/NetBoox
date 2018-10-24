package com.netbux.zookeeper;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.curator.framework.CuratorFramework;

import com.netbux.pojos.InstanceDetails;
import com.netbux.pojos.ZookeeperClient;

public class InitiateServiceRegistry implements ServletContextListener {

	private CuratorFramework client;
	private Registrar getBooks;
	private Registrar getBookById;
	private Registrar getAuthors;
	private Registrar getAuthorById;
	private ZookeeperClient zookeeperClient;
	
	@Override
	public void contextInitialized(ServletContextEvent s) {
		zookeeperClient = ZookeeperClient.getInstance();
		client = zookeeperClient.getClient();
		client.start();
		
		InstanceDetails getBooksInstance = new InstanceDetails();
		InstanceDetails getBookByIdInstance = new InstanceDetails();
		InstanceDetails getAuthorsInstance = new InstanceDetails();
		InstanceDetails getAuthorByIdInstance = new InstanceDetails();
		
		getBooksInstance.setDescription("returns all available books");
		getBooksInstance.setVersion("1.0");
		getBookByIdInstance.setDescription("returns the book by its id");
		getBookByIdInstance.setVersion("1.0");
		getAuthorsInstance.setDescription("returns all authors");
		getAuthorsInstance.setVersion("1.0");
		getAuthorByIdInstance.setDescription("returns an author by his id");
		getAuthorByIdInstance.setVersion("1.0");
		
		getBooks = new Registrar(client, "getBooks", getBooksInstance, "books");
		getBooks.registerService();
		
		getBookById = new Registrar(client, "getBookById", getBookByIdInstance, "books");
		getBookById.registerService();
		
		getAuthors = new Registrar(client, "getAuthors", getAuthorsInstance, "authors");
		getAuthors.registerService();
		
		getAuthorById = new Registrar(client, "getAuthorById", getAuthorByIdInstance, "authors");
		getAuthorById.registerService();
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		client.close();
		getBooks.close();
		getBookById.close();
		getAuthors.close();
		getAuthorById.close();
	}
	
}
