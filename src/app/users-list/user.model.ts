import {v4 as uuidv4} from 'uuid';

export class User {
  public name: string;
  public date: Date;
  public id: uuidv4; 

  constructor(name: string, date, id) {
    this.name = name;
    this.date = date;
    this.id = id;
  }
}