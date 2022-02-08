import { useDeleteUnit } from "hooks";
import { Unit } from "types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteUnitFormProps extends Pick<Unit, "id"> {
  disabled?: boolean;
}

export default function DeleteUnitForm({
  id = "",
  disabled,
}: DeleteUnitFormProps) {
  const deleteUnit = useDeleteUnit();

  return (
    <IconButton
      aria-label="delete"
      size="large"
      disabled={disabled}
      onClick={() => {
        deleteUnit.mutate({ id });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
