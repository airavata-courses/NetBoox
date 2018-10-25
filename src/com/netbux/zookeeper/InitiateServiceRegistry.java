package com.netbux.zookeeper;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.curator.RetryPolicy;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;

import com.netbux.pojos.InstanceDetails;

public class InitiateServiceRegistry implements ServletContextListener {

	private CuratorFramework client;
	
	@Override
	public void contextInitialized(ServletContextEvent s) {
		RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
		client = CuratorFrameworkFactory.newClient("149.165.170.59", retryPolicy);
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
		
		Zookeeper getBooks = new Zookeeper(client, "getBooks", getBooksInstance);
		getBooks.registerService();
		
		Zookeeper getBookById = new Zookeeper(client, "getBookById", getBookByIdInstance);
		getBookById.registerService();
		
		Zookeeper getAuthors = new Zookeeper(client, "getAuthors", getAuthorsInstance);
		getAuthors.registerService();
		
		Zookeeper getAuthorById = new Zookeeper(client, "getAuthorById", getAuthorByIdInstance);
		getAuthorById.registerService();
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		client.close();
	}
	
}
