package br.com.sbm.book.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("book")
public class Book {

	@Id
	private Long id;
	private String genre;
	private String publisher;
	private String language;

	public Book() {
	}
	
	public Book(Long id, String genre, String publisher, String language) {
		this.id = id;
		this.genre = genre;
		this.publisher = publisher;
		this.language = language;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getGenre() {
		return genre;
	}
	
	public void setGenre(String genre) {
		this.genre = genre;
	}
	
	public String getPublisher() {
		return publisher;
	}
	
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	
	public String getLanguage() {
		return language;
	}
	
	public void setLanguage(String language) {
		this.language = language;
	}
		
}
