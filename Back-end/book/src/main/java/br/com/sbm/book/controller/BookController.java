package br.com.sbm.book.controller;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.sbm.book.model.Book;
import br.com.sbm.book.service.BookService;

@RestController
@RequestMapping("/book")
public class BookController {

	@Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) throws SQLException {
    	Book novoBook = bookService.createBook(book);
        return new ResponseEntity<>(novoBook, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Book>> readBooks() throws SQLException {
        return ResponseEntity.ok(bookService.readBooks());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) throws SQLException {
        Book updatedBook = bookService.updateBook(id, bookDetails);

        if (updatedBook != null) {
            return ResponseEntity.ok(updatedBook);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) throws SQLException {
    	bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<Iterable<Book>> searchBooks(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String publisher,
            @RequestParam(required = false) String language) throws SQLException {
        return ResponseEntity.ok(bookService.searchBooks(genre, publisher, language));
    }
}
