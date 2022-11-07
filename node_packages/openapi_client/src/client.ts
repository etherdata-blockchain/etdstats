import axios, { AxiosStatic } from "axios";

interface Props {
  client: AxiosStatic;
  baseUrl: string;
}

export class Client {
  client: AxiosStatic;
  baseUrl: string;

  constructor({ client, baseUrl }: Props) {
    this.client = client;
    this.baseUrl = baseUrl;
  }
}
