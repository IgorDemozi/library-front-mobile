import { AuthProvider } from '../src/contexts/auth';
import { BookProvider } from '../src/contexts/book';
import Routes from '../src/routes';

export default function RootLayout() {
  return (
    <AuthProvider>
      <BookProvider>
        <Routes />
      </BookProvider>
    </AuthProvider>
  );
}
