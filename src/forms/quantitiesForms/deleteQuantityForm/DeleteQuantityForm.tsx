import { useDeleteQuantity } from "hooks";
import { Quantity } from "types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteQuantityFormProps extends Pick<Quantity, "id"> {
  disabled?: boolean;
}

export default function DeleteQuantityForm({
  id = "",
  disabled,
}: DeleteQuantityFormProps) {
  const deleteQuantity = useDeleteQuantity();

  return (
    <IconButton
      aria-label="delete"
      size="large"
      disabled={disabled}
      onClick={() => {
        deleteQuantity.mutate({ id });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
