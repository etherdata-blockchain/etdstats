import React, { useCallback, useEffect, useState } from "react";
import { MeiliSearch, Index } from "meilisearch";

export default function useSearch() {
  const [index, setIndex] = useState<Index | null>(null);

  useEffect(() => {
    const client = new MeiliSearch({
      host: process.env.NEXT_PUBLIC_MEILISEARCH_API_ENDPOINT!,
      apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY!,
    });
    client.getIndex("blocks").then((index) => {
      setIndex(index);
    });
  }, []);

  const search = useCallback(
    async (keyword: string) => {
      if (index) {
        const results = await index.search(keyword);
        return results.hits;
      }
    },
    [index]
  );

  return { search };
}
