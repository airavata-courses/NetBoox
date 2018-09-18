package com.netbux.dao;

import java.net.UnknownHostException;
import java.util.ArrayList;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.netbux.pojos.Author;
import com.netbux.pojos.Book;

public class BookDAO {
	
	private MongoClient mongoClient;
	private DB database;
	
	public BookDAO() {
		try {
			mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		database = mongoClient.getDB("netbux");
	}
	
	public ArrayList<Book> getBooks() {
			
		DBCollection collection = database.getCollection("books");
		DBCursor cursor = collection.find();
		ArrayList<Book> bookList = new ArrayList<>();
	
		while(cursor.hasNext()) {
			DBObject dbObject = cursor.next();
			Book book = parseDbObject(dbObject);
			bookList.add(book);
		}
		
		return bookList;
		
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
			BasicDBObject query = new BasicDBObject();
		    query.put("_id", new ObjectId(ids));
		    DBObject dbObj = collection.findOne(query);
		    
		    String firstName = (String) dbObj.get("firstName");
		    String lastName = (String) dbObj.get("lastName");
		    
		    Author author = new Author(ids, firstName, lastName);
		    authorList.add(author);
		}
		
		return new Book(id, title, desc, edition, authorList, link, imageLocation);
		
		
	}
}
