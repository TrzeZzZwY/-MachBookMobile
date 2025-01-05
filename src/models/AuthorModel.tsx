import { AuthorType } from "../types/AuthorType";

export class AuthorModel implements AuthorType {
    
    public firstName: string = "";
    public lastName: string = "";
    public country: string = "";
    public yearOfBirth: number = 0;
    public id: number = 0;
    public label: string = "";

    constructor(author: AuthorType) {
        this.id = author.id;
        this.firstName = author.firstName;
        this.lastName = author.lastName;
        this.country = author.country;
        this.yearOfBirth = author.yearOfBirth;
        this.label = `${author.firstName} ${author.lastName}`
    }
}