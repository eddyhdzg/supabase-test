import { forwardRef, useState } from "react";
import {
  Button,
  Fab,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  FormControl,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import { NumberFormatInput } from "components";
import { SubmitForm } from "types";
import { CreateQuantitySchema } from "hooks";

interface CreateQuantityFormLayoutProps {
  onSubmit: SubmitForm;
}

export default function CreateQuantityFormLayout({
  onSubmit,
}: CreateQuantityFormLayoutProps) {
  const {
    control,
    formState: { isValid },
  } = useFormContext<CreateQuantitySchema>();

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Zoom
        in
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab
          sx={{
            position: "fixed",
            bottom: {
              xxs: "calc(72px + env(safe-area-inset-bottom))",
              sm: 16,
            },
            right: 16,
          }}
          color="secondary"
          aria-label="create-quantity"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="create-quantity-dialog"
        maxWidth="xs"
      >
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <DialogTitle>Create new quantity</DialogTitle>
          <DialogContent>
            <Controller
              name="quantity"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <FormControl>
                    <TextField
                      id="quantity-input"
                      variant="outlined"
                      error={Boolean(fieldState.error)}
                      inputProps={{
                        inputMode: "decimal",
                        min: 0,
                        thousandSeparator: true,
                        decimalScale: 4,
                      }}
                      InputProps={{
                        inputComponent: NumberFormatInput as any,
                      }}
                      sx={{
                        mt: 2,
                      }}
                      {...field}
                    />
                  </FormControl>
                );
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={handleClose}
              variant="contained"
              disabled={!isValid}
              type="submit"
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
