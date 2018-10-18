package com.netbux.dao;

import java.util.ArrayList;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.netbux.pojos.Author;

public class AuthorDAO {
	MongoClient mongoClient;
	DB database;
	DBCollection collection;
	
	public AuthorDAO() {
		DbConnection dbConnection = DbConnection.getInstance();
		mongoClient = dbConnection.getMongoClient();
		database = dbConnection.getDatabase();
		collection = database.getCollection("authors");
	}
	
	public ArrayList<Author> getAuthors() {
		DBCursor cursor = collection.find();
		ArrayList<Author> authorList = new ArrayList<>();
	
		while(cursor.hasNext()) {
			DBObject dbObject = cursor.next();
			Author author = parseDbObject(dbObject);
			authorList.add(author);
		}
		cursor.close();
		return authorList;
	
	}
	
	public Author getAuthorById(String id) {
		BasicDBObject query = new BasicDBObject();
		query.put("_id", new ObjectId(id));
		return parseDbObject(collection.findOne(query));
	}

	public Author parseDbObject(DBObject dbObject) {
		
		String id = dbObject.get("_id").toString();
		String firstName = (String) dbObject.get("firstName");
		String lastName = (String) dbObject.get("lastName");
		String gender = (String) dbObject.get("gender");
		
		return new Author(id, firstName, lastName, gender);
	}
}
