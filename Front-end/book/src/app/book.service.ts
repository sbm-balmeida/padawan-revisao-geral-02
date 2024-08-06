import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/book';

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
  }
}
