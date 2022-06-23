import axios, { Axios } from "axios";

interface Props {
  client: Axios;
  baseUrl: string;
}

export class Client {
  client: Axios;
  baseUrl: string;

  constructor({ client, baseUrl }: Props) {
    this.client = client;
    this.baseUrl = baseUrl;
  }
}
