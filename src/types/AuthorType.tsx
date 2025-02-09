import { SearchableType } from "./SearchableType";

export interface AuthorType extends SearchableType {
  firstName: string;
  lastName: string;
  country: string;
  yearOfBirth: number;
}
