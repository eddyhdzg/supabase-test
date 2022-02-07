import { SnackbarProvider as Provider } from "notistack";

const SnackbarProvider: React.FC = ({ children }) => {
  return (
    <Provider maxSnack={3} autoHideDuration={2500}>
      {children}
    </Provider>
  );
};

export default SnackbarProvider;
