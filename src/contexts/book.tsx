import { createContext, useContext, useState } from 'react';
import { IChildrenProp } from '../types';

interface IBookContext {
  bookId: string;
  setBookId: React.Dispatch<React.SetStateAction<string>>;
}

export const BookContext = createContext<IBookContext>({} as IBookContext);

function BookProvider({ children }: IChildrenProp) {
  const [bookId, setBookId] = useState('');
  return <BookContext.Provider value={{ bookId, setBookId }}>{children}</BookContext.Provider>;
}

function useBookContext() {
  const context = useContext(BookContext);
  return context;
}

export { BookProvider, useBookContext };
