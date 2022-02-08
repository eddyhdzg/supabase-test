import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Unit } from "types";
import { useSnackbar } from "notistack";
import { UpdateUnitSchema } from "hooks";
import { UseFormReset } from "react-hook-form";

const createUnit = async (unit?: string) => {
  const { data, error } = await supabase
    .from<Unit>("units")
    .select("*")
    .eq("unit", unit)
    .then(async (res) => {
      if (res.data?.length) {
        throw new Error("Duplicated");
      }
      return await supabase.from<Unit>("units").insert({ unit }).single();
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useCreateUnit(reset: UseFormReset<UpdateUnitSchema>) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(({ unit }: Pick<Unit, "unit">) => createUnit(unit), {
    onMutate: async (newUnit: Unit) => {
      await queryClient.cancelQueries("unitsRowData");
      const previousUnits = queryClient.getQueryData<Unit[]>("unitsRowData");
      queryClient.setQueryData<Unit[]>("unitsRowData", (units = []) => [
        ...units,
        newUnit,
      ]);

      return { previousUnits };
    },
    onSuccess: (unit) => {
      enqueueSnackbar(`Unit with id ${unit?.id} created 🔥`, {
        variant: "success",
      });
    },
    onError: (_, __, context) => {
      enqueueSnackbar(`Error: unit not created 😔 `, {
        variant: "error",
      });

      if (context?.previousUnits) {
        queryClient.setQueryData<Unit[]>("unitsRowData", context.previousUnits);
      }
    },
    onSettled: () => {
      reset();
      queryClient.invalidateQueries("units");
      queryClient.invalidateQueries("unitsRowData");
    },
  });
}
