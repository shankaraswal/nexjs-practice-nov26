import "server-only";
import type { QuotesResponse } from "./model";

export async function getQuotes() {
  const response = await fetch("https://dummyjson.com/quotes?limit=0");

  if (!response.ok) {
    throw new Error("Could not load quotes");
  }

  const data: QuotesResponse = await response.json();
  return data.quotes;
}
