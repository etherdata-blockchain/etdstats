import Dexie, { Table } from "dexie";
import { TransactionResponse } from "openapi_client";

export interface SearchResult {
  id: string;
  result: TransactionResponse;
}

export class SearchModel extends Dexie {
  searchResults: Table<SearchResult>;

  constructor() {
    super("SearchModel");
    this.version(1).stores({
      searchResults: "++id",
    });
    this.searchResults = this.table("searchResults");
  }
}

export const db = new SearchModel();
