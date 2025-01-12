import './App.css';
import { ThemeProvider } from './components/theme-provider';
import './index.css';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
