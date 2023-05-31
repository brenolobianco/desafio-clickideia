
import { RoutesMain } from "./routes/Routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <RoutesMain />
      <ToastContainer />
    </>
  );
};

export default App;