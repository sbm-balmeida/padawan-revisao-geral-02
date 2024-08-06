import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

/*
É um decorador que marca a classe como um serviço que pode ser injetado em outros componentes ou serviços.
*/
@Injectable({
  providedIn: 'root' 
  /*
  Especifica que o serviço deve ser fornecido na raiz do aplicativo, o que significa que haverá uma única instância do serviço em toda a aplicação (serviço singleton).
  */
})

export class BookService {

  private apiUrl = 'http://localhost:8080/book'; 
  /*
  É uma URL base para as chamadas HTTP que interagem com a API.
  */

  constructor(private http: HttpClient) { }
  /*
  Um serviço Angular para fazer requisições HTTP. É injetado no construtor, permitindo que o BookService faça requisições HTTP para a API.
  */

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
    /*
    Recebe um objeto Book que representa o livro a ser criado. Irá retornar um Observable que emite o livro criado. O tipo Book é esperado como resposta.
    */
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
    /*
    Irá retornar um Observable que emite um array de livros (Book[]).
    */
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
    /*
    Recebe um id (identificador do livro) e um objeto Book com os novos dados. Irá retornar um Observable que emite o livro atualizado. 
    */
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    /*
    Recebe um id (identificador do livro a ser excluído). Irá retornar um Observable que não emite nenhum valor (tipo void), apenas indica que a exclusão foi realizada.
    */
  }

  searchBooks(genre?: string, publisher?: string, language?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (genre) {
      params = params.append('genre', genre);
    }
    if (publisher) {
      params = params.append('publisher', publisher);
    }
    if (language) {
      params = params.append('language', language);
    }

    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params });
    /*
    Os parâmetros genre, publisher, e language são parâmetros de busca opcionais. Irá retornar um Observable que emite um array de livros (Book[]) que correspondem aos critérios de pesquisa.
    */
  }
}
