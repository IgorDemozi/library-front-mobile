import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../src/contexts/auth';
import { BookProvider } from '../src/contexts/book';
import Routes from '../src/routes';

export default function RootLayout() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <BookProvider>
          <Routes />
        </BookProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
