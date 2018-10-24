package com.netbux.dao;

import java.util.ArrayList;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.apache.curator.x.discovery.ServiceInstance;
import org.bson.types.ObjectId;
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.filter.LoggingFilter;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.netbux.pojos.Author;
import com.netbux.pojos.Book;
import com.netbux.pojos.InstanceDetails;
import com.netbux.pojos.ZookeeperClient;
import com.netbux.zookeeper.ServiceDiscoverer;
import com.netbux.dao.DbConnection;

public class BookDAO {
	
	private MongoClient mongoClient;
	private DB database;
	private DBCollection collection;
	
	public BookDAO() {
		DbConnection dbConnection = DbConnection.getInstance();
		this.mongoClient = dbConnection.getMongoClient();
		this.database = dbConnection.getDatabase();
		this.collection = database.getCollection("books");
	}
	
	public ArrayList<Book> getBooks() {
			
		DBCursor cursor = collection.find();
		ArrayList<Book> bookList = new ArrayList<>();
	
		while(cursor.hasNext()) {
			DBObject dbObject = cursor.next();
			Book book = parseDbObject(dbObject);
			bookList.add(book);
		}
		cursor.close();
		return bookList;
		
	}
	
	public Book getBookById(String id) {
		BasicDBObject query = new BasicDBObject();
		query.put("_id", new ObjectId(id));
		return parseDbObject(collection.findOne(query));
	}
	
	public Book parseDbObject(DBObject dbObject) {
		
		String id = dbObject.get("_id").toString();
		String title = (String) dbObject.get("title");
		String desc = (String) dbObject.get("desc");
		String edition = (String) dbObject.get("edition");
		ArrayList<String> authors = (ArrayList<String>) dbObject.get("authors");
		String link = (String) dbObject.get("link");
		String imageLocation = (String) dbObject.get("imageLocation");
		
		DBCollection collection = database.getCollection("authors");
		ArrayList<Author> authorList = new ArrayList<Author>();
		
		for (String ids : authors) {

			ServiceDiscoverer discoverer = new ServiceDiscoverer("getAuthorById", "authors");
			discoverer.start();
			ClientConfig config = new ClientConfig();
			Client getAuthorById = ClientBuilder.newClient(config.register(LoggingFilter.class));
			
			ServiceInstance<InstanceDetails> authorInstance = discoverer.getServiceUrl();
			
			WebTarget webTarget = getAuthorById.target(UriBuilder.fromUri(authorInstance.buildUriSpec()).path(ZookeeperClient.BASE_PATH + "authors/getAuthorById").path(ids).build());
			Invocation.Builder invocationBuilder = webTarget.request(MediaType.APPLICATION_JSON);
			Response response = invocationBuilder.get();
			
		    JSONObject responseJson = new JSONObject(response.readEntity(String.class));
			String authorId = responseJson.getString("id");
			String firstName = responseJson.getString("firstName");
			String lastName = responseJson.getString("lastName");
			String gender = responseJson.getString("gender");
			Author author = new Author(authorId, firstName, lastName, gender);
		    
		    authorList.add(author);
		    discoverer.close();
		}
		
		return new Book(id, title, desc, edition, authorList, link, imageLocation);
	}	
	
	public MongoClient getMongoClient() {
		return mongoClient;
	}

	public DB getDatabase() {
		return database;
	}	
}
