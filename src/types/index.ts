export type Book = {
  id: number | string;
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
