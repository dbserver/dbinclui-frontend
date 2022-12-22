import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({
    logInModal: {
        "& .MuiPaper-root": {
            backgroundColor: "#FFFF",
            borderRadius: "8px",
        }
    },
    logInModalContrast: {
        "& .MuiPaper-root": {
            backgroundColor: "#FFFF00",
            borderRadius: "8px",
        }
    }
})