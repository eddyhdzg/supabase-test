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
import { SubmitForm } from "types";
import { Transition } from "components";
import { CreateUnitSchema } from "hooks";

interface CreateUnitFormLayoutProps {
  onSubmit: SubmitForm;
}

export default function CreateUnitFormLayout({
  onSubmit,
}: CreateUnitFormLayoutProps) {
  const {
    control,
    formState: { isValid },
  } = useFormContext<CreateUnitSchema>();

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
          aria-label="create-unit"
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
        aria-describedby="create-unit-dialog"
        maxWidth="xs"
      >
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <DialogTitle>Create new unit</DialogTitle>
          <DialogContent>
            <Controller
              name="unit"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <FormControl>
                    <TextField
                      id="unit-input"
                      variant="outlined"
                      error={Boolean(fieldState.error)}
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
