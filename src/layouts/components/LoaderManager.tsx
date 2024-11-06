import {useLoader} from "src/context/LoaderContext";
import {Backdrop} from "@mui/material";
import Spinner from "src/@core/components/spinner";

const LoaderManager = () => {
  const { loading } = useLoader();

  return (
    <Backdrop open={loading}
              sx={{ zIndex: 99999, backgroundColor: '#ffffffd6' }}
    >
      <Spinner />
    </Backdrop>
  );
}

export default LoaderManager;
