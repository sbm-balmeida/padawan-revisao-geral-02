import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = []; //Armazena a lista de livros recuperados do serviço.
  newBook: Book = new Book(0, '', '', ''); //Representa um novo livro a ser adicionado.
  bookSelecionado: Book | null = null; //Armazena o livro selecionado para edição.
  showAddForm: boolean = false; //Controla a visibilidade do formulário de adição de livro.
  searchGenre: string = ''; //Armazenam os critérios de busca.
  searchPublisher: string = '';
  searchLanguage: string = '';

  constructor(private bookService: BookService) { }
  /*
  Injeta o serviço BookService, que será utilizado para interagir com a API.
  */

  ngOnInit(): void {
    this.getBooks();
    /*
    O método ngOnInit é chamado quando o componente é inicializado. Ele chama o método getBooks para carregar a lista de livros.
    */
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
    /*
    Chama o método getBooks do serviço para obter a lista de livros e atualiza o atributo books.
    */
  }

  startAddBook(): void {
    this.showAddForm = true;
    /*
    Define showAddForm como true para exibir o formulário de adição de livro.
    */
  }

  addBook(): void {
    this.bookService.createBook(this.newBook).subscribe((book: Book) => {
      this.books.push(book);
      this.newBook = new Book(0, '', '', '');
      this.showAddForm = false;
    });
    /*
    Chama o método createBook do serviço para adicionar um novo livro. Ao receber o livro adicionado, atualiza a lista de livros, redefine newBook e esconde o formulário de adição.
    */
  }

  startEditBook(book: Book): void {
    this.bookSelecionado = { ...book };
    /*
    Define bookSelecionado como uma cópia do livro que será editado.
    */
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
    /*
    Chama o método updateBook do serviço para atualizar o livro. Ao receber o livro atualizado, substitui o livro correspondente na lista books e redefine bookSelecionado.
    */
  }

  cancelEditBook(): void {
    this.bookSelecionado = null;
    /*
    Cancela a edição, redefinindo bookSelecionado como null.
    */
  }

  cancelAddBook(): void {
    this.showAddForm = false;
    /*
    Cancela a adição de livro, escondendo o formulário de adição.
    */
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
    /*
    Chama o método deleteBook do serviço para excluir o livro. Remove o livro correspondente da lista books.
    */
  }

  searchBooks(): void {
    this.bookService.searchBooks(this.searchGenre, this.searchPublisher, this.searchLanguage).subscribe((data: Book[]) => {
      this.books = data;
    });
    /*
    Chama o método searchBooks do serviço para buscar livros com os critérios especificados (searchGenre, searchPublisher, searchLanguage). Atualiza a lista books com os resultados da busca.
    */
  }
  
}
