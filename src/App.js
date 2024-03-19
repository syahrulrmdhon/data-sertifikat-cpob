import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import TableCertificatePage from './TableCertificatePage';
import "primereact/resources/themes/lara-light-cyan/theme.css";


function App() {
  return (
    <PrimeReactProvider>
      <TableCertificatePage />
    </PrimeReactProvider>
  );
}

export default App;
