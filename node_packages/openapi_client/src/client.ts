import axios, { Axios } from "axios";

export class Client {
  client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }
}
