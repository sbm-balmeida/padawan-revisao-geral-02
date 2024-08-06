export class Book {
    id: number;
    genre: string;
    publisher: string;
    language: string;

    constructor(id: number, genre: string, publisher: string, language: string) {
        this.id = id;
        this.genre = genre;
        this.publisher = publisher;
        this.language = language;
    }
}
