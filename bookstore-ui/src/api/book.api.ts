import { Book } from "@/types";
import httpClient from "./http-client";

// Books for users to borrow
export const fetchAvailableBooks = async (): Promise<Book[]> => {
  const response = await httpClient.get("/books/available");
  const books = await response.data;
  return books;
};

// Books that the user has borrowed
export const fetchBorrowedBooks = async (): Promise<Book[]> => {
  const response = await httpClient.get("/books/borrowed");
  const books = await response.data;
  return books;
};

export const fetchNumberOfAvailableBooks = async (): Promise<number> => {
  const response = await httpClient.get("/books/available/count");
  const count = await response.data;
  return count;
};

// All books in the library (for admins)
export const fetchAllBooks = async (): Promise<Book[]> => {
  const response = await httpClient.get("/books");
  const books = await response.data;
  return books;
};

export const borrowBook = async (bookId: string): Promise<void> => {
  await httpClient.post(`/books/borrow/${bookId}`);
};

export const returnBook = async (bookId: string): Promise<void> => {
  await httpClient.post(`/books/return/${bookId}`);
};

export const addBook = async (book: Book): Promise<void> => {
  await httpClient.post("/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(book),
  });
};