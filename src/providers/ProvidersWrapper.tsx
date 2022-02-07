import ThemeProvider from "./ThemeProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { RouterMemo } from "router";
import { BrowserRouter } from "react-router-dom";
import SnackbarProvider from "./snackbarProvider/SnackbarProvider";

const ProvidersWrapper: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <RouterMemo>
        <ThemeProvider>
          <ReactQueryProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </RouterMemo>
    </BrowserRouter>
  );
};

export default ProvidersWrapper;
