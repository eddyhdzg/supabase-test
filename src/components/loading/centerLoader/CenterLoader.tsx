import { CircularProgress } from "@mui/material";
import { CenterLoaderRoot } from "./CenterLoader.styled";

const CenterLoader: React.FC = () => {
  return (
    <CenterLoaderRoot>
      <CircularProgress />
    </CenterLoaderRoot>
  );
};

export default CenterLoader;
