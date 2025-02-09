import { AuthorType } from "../types/AuthorType";
import BookType from "../types/BookType";

export default class BookModel implements BookType {
  public id: number = 0;
  public title: string = "";
  public authors: AuthorType[] = [];
  public label: string = "";

  constructor(book: BookType) {
    this.id = book.id;
    this.title = book.title;
    this.authors = book.authors;
    this.label = `${book.title}`;
  }
}
