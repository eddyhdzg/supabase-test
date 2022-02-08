import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { useSnackbar } from "notistack";
import { Unit, UnitRowData } from "types";

interface deleteUnitProps {
  id: string;
}

const deleteUnit = async (id: string) => {
  const { data, error } = await supabase
    .from<Unit>("units")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useDeleteUnit() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(({ id }: deleteUnitProps) => deleteUnit(id), {
    onMutate: async (deletedUnit: Unit) => {
      await queryClient.cancelQueries("unitsRowData");
      const previousUnits =
        queryClient.getQueryData<UnitRowData[]>("unitsRowData");
      queryClient.setQueryData<UnitRowData[]>("unitsRowData", (units = []) =>
        units.filter((units) => units.id !== deletedUnit.id)
      );
      return { previousUnits };
    },
    onSuccess: (unit) => {
      enqueueSnackbar(`Unit with id ${unit?.id} deleted 🔥`, {
        variant: "success",
      });
    },
    onError: (_, unit, context) => {
      enqueueSnackbar(`Error: unit with id ${unit.id} not edited 😔 `, {
        variant: "error",
      });
      if (context?.previousUnits) {
        queryClient.setQueryData<Unit[]>("unitsRowData", context.previousUnits);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("units");
      queryClient.invalidateQueries("unitsRowData");
    },
  });
}
