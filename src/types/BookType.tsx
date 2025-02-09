import { AuthorType } from "./AuthorType";
import { SearchableType } from "./SearchableType";

export default interface BookType extends SearchableType {
  id: number;
  title: string;
  authors: AuthorType[];
}
