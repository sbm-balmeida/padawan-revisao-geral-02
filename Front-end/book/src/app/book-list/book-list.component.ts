import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  newBook: Book = new Book(0, '', '', '');
  bookSelecionado: Book | null = null;
  showAddForm: boolean = false;
  searchGenre: string = '';
  searchPublisher: string = '';
  searchLanguage: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  startAddBook(): void {
    this.showAddForm = true;
  }

  addBook(): void {
    this.bookService.createBook(this.newBook).subscribe((book: Book) => {
      this.books.push(book);
      this.newBook = new Book(0, '', '', '');
      this.showAddForm = false;
    });
  }

  startEditBook(book: Book): void {
    this.bookSelecionado = { ...book };
  }

  saveEditBook(): void {
    if (this.bookSelecionado) {
      this.bookService.updateBook(this.bookSelecionado.id, this.bookSelecionado).subscribe((book: Book) => {
        const index = this.books.findIndex(b => b.id === book.id);
        if (index !== -1) {
          this.books[index] = book;
        }
        this.bookSelecionado = null;
      });
    }
  }

  cancelEditBook(): void {
    this.bookSelecionado = null;
  }

  cancelAddBook(): void {
    this.showAddForm = false;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }

  searchBooks(): void {
    this.bookService.searchBooks(this.searchGenre, this.searchPublisher, this.searchLanguage).subscribe((data: Book[]) => {
      this.books = data;
    });
  }

}
