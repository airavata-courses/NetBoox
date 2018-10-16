package com.netbux.dao;

import java.net.UnknownHostException;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class DbConnection {
	
	private MongoClient mongoClient;
	private DB database;
	private static DbConnection instance;
	
	private DbConnection() {
		try {
			this.mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.database = mongoClient.getDB("netbux");
	}
	
	public static DbConnection getInstance() {
		if(instance == null) {
			instance = new DbConnection();
		}
		return instance;
	}

	public MongoClient getMongoClient() {
		return mongoClient;
	}

	public DB getDatabase() {
		return database;
	}
	
}
