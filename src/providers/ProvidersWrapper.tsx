import ThemeProvider from "./ThemeProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { RouterMemo } from "router";
import { BrowserRouter } from "react-router-dom";

const ProvidersWrapper: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <RouterMemo>
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </RouterMemo>
    </BrowserRouter>
  );
};

export default ProvidersWrapper;
