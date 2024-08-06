package br.com.sbm.book.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sbm.book.model.Book;

@Service
public class BookService {
    
    @Autowired
    private DataSource dataSource;

    public Book createBook(Book book) throws SQLException {
        String sql = "INSERT INTO book (genre, publisher, language) VALUES (?, ?, ?);";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement pstm = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
        	pstm.setString(1, book.getGenre());
            pstm.setString(2, book.getPublisher());
            pstm.setString(3, book.getLanguage());
            pstm.executeUpdate();
            
            try (ResultSet generatedKeys = pstm.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    book.setId(generatedKeys.getLong(1));
                }
            }
        }
		return book;
    }

    public List<Book> readBooks() throws SQLException {
        List<Book> books = new ArrayList<>();
        String sql = "SELECT * FROM book;";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement pstm = connection.prepareStatement(sql);
             ResultSet rst = pstm.executeQuery()) {

            while (rst.next()) {
                Book book = new Book(
                        rst.getLong("id"), 
                        rst.getString("genre"), 
                        rst.getString("publisher"), 
                        rst.getString("language"));
                books.add(book);
            }
        }
        return books;
    }
    
    public Book updateBook(Long id, Book book) throws SQLException {
    	if (id == null || book == null) {
            throw new IllegalArgumentException("ID and Book must not be null");
        }
    	
        String sql = "UPDATE book SET genre = ?, publisher = ?, language = ? WHERE id = ?;";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement pstm = connection.prepareStatement(sql)) {
        	
        	pstm.setString(1, book.getGenre());
        	pstm.setString(2, book.getPublisher());
        	pstm.setString(3, book.getLanguage());
        	pstm.setLong(4, id);
        	pstm.executeUpdate();
        	int rowsAffected = pstm.executeUpdate();
            if (rowsAffected > 0) {
                book.setId(id);
                return book;
            } else {
                return null;
            }
        }
    }
    
    public void deleteBook(Long id) throws SQLException {
        String sql = "DELETE FROM book WHERE id = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement pstm = connection.prepareStatement(sql)) {
            pstm.setLong(1, id);
            pstm.executeUpdate();
        }
    }
    
    public List<Book> searchBooks(String genre, String publisher, String language) throws SQLException {
        List<Book> books = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT * FROM book WHERE 1=1");

        if (genre != null && !genre.isEmpty()) {
            sql.append(" AND genre LIKE ?");
        }
        if (publisher != null && !publisher.isEmpty()) {
            sql.append(" AND publisher LIKE ?");
        }
        if (language != null && !language.isEmpty()) {
            sql.append(" AND language LIKE ?");
        }

        try (Connection connection = dataSource.getConnection();
             PreparedStatement pstm = connection.prepareStatement(sql.toString())) {

            int paramIndex = 1;

            if (genre != null && !genre.isEmpty()) {
                pstm.setString(paramIndex++, "%" + genre + "%");
            }
            if (publisher != null && !publisher.isEmpty()) {
                pstm.setString(paramIndex++, "%" + publisher + "%");
            }
            if (language != null && !language.isEmpty()) {
                pstm.setString(paramIndex++, "%" + language + "%");
            }

            try (ResultSet rst = pstm.executeQuery()) {
                while (rst.next()) {
                    Book book = new Book(
                            rst.getLong("id"),
                            rst.getString("genre"),
                            rst.getString("publisher"),
                            rst.getString("language")
                    );
                    books.add(book);
                }
            }
        }
        return books;
    }
}