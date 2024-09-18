import { LocationProviderProps } from "./defs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const LocationProvider = ({ children }: LocationProviderProps) => {
	return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};

export default LocationProvider;
