package com.netbux.pojos;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Book {
	private String id;
	private String title;
	private String desc;
	private String edition;
	private ArrayList<Author> authors;
	private String link;
	private String imageLocation;
	
	public Book() {
		
	}
	
	public Book(String id, String title, String desc, String edition, ArrayList<Author> authors, String link, String imageLocation) {
		super();
		this.id = id;
		this.title = title;
		this.desc = desc;
		this.edition = edition;
		this.authors = authors;
		this.link = link;
		this.imageLocation = imageLocation;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getEdition() {
		return edition;
	}

	public void setEdition(String edition) {
		this.edition = edition;
	}


	public ArrayList<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(ArrayList<Author> authors) {
		this.authors = authors;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getImageLocation() {
		return imageLocation;
	}

	public void setImageLocation(String imageLocation) {
		this.imageLocation = imageLocation;
	}
	
}
