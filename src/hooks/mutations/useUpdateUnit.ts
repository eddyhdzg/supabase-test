import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Unit, UnitRowData } from "types";
import { useSnackbar } from "notistack";
import { UpdateUnitSchema } from "hooks";
import { UseFormReset } from "react-hook-form";

const updateUnit = async ({ id, unit }: Unit) => {
  const { data, error } = await supabase
    .from<Unit>("units")
    .select("*")
    .eq("unit", unit)
    .then(async (res) => {
      if (res.data?.length) {
        throw new Error("Duplicated");
      }
      return await supabase
        .from<Unit>("units")
        .update({ unit })
        .eq("id", id)
        .single();
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useUpdateUnit(reset: UseFormReset<UpdateUnitSchema>) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation((unit: Unit) => updateUnit(unit), {
    onMutate: async (updatedUnit: Unit) => {
      await queryClient.cancelQueries("unitsRowData");
      const previousUnits =
        queryClient.getQueryData<UnitRowData[]>("unitsRowData");
      queryClient.setQueryData<UnitRowData[]>("unitsRowData", (units = []) =>
        units.map((unit) =>
          unit.id !== updatedUnit.id
            ? unit
            : {
                ...unit,
                unit: updatedUnit.unit,
              }
        )
      );
      return { previousUnits };
    },
    onSuccess: (unit) => {
      enqueueSnackbar(`Unit with id ${unit?.id} edited 🔥`, {
        variant: "success",
      });
    },
    onError: (_, unit, context) => {
      enqueueSnackbar(`Error: unit with id ${unit.id} not edited 😔 `, {
        variant: "error",
      });

      if (context?.previousUnits) {
        queryClient.setQueryData<UnitRowData[]>(
          "unitsRowData",
          context.previousUnits
        );
      }
    },
    onSettled: () => {
      reset();
      queryClient.invalidateQueries("units");
      queryClient.invalidateQueries("unitsRowData");
    },
  });
}
