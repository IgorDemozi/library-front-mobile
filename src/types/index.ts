import { ReactNode } from 'react';

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  isRented: boolean;
  isActive: boolean;
  statusDescription: string;
  image: string;
  systemEntryDate: string;
  synopsis: string;
  rentHistory: RentHistory[];
};

export type RentHistory = {
  studentName: string;
  class: string;
  title?: string;
  loanDate: string;
  returnDate: string;
};

export interface IChildrenProp {
  children: ReactNode;
}
