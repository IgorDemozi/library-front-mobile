import { AuthProvider } from '../src/contexts/auth';
import Routes from '../src/routes';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
