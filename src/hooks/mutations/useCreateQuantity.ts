import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Quantity } from "types";
import { useSnackbar } from "notistack";
import { UpdateQuantitySchema } from "hooks";
import { UseFormReset } from "react-hook-form";

const createQuantity = async (quantity?: number) => {
  const { data, error } = await supabase
    .from<Quantity>("quantities")
    .select("*")
    .eq("quantity", quantity)
    .then(async (res) => {
      if (res.data?.length) {
        throw new Error("Duplicated");
      }
      return await supabase
        .from<Quantity>("quantities")
        .insert({ quantity })
        .single();
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useCreateQuantity(
  reset: UseFormReset<UpdateQuantitySchema>
) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ({ quantity }: Pick<Quantity, "quantity">) => createQuantity(quantity),
    {
      onMutate: async (newQuantity: Quantity) => {
        await queryClient.cancelQueries("quantitiesRowData");
        const previousQuantities =
          queryClient.getQueryData<Quantity[]>("quantitiesRowData");
        queryClient.setQueryData<Quantity[]>(
          "quantitiesRowData",
          (quantities = []) => [...quantities, newQuantity]
        );

        return { previousQuantities };
      },
      onSuccess: (quantity) => {
        enqueueSnackbar(`Quantity with id ${quantity?.id} created 🔥`, {
          variant: "success",
        });
      },
      onError: (_, __, context) => {
        enqueueSnackbar(`Error: quantity not created 😔 `, {
          variant: "error",
        });

        if (context?.previousQuantities) {
          queryClient.setQueryData<Quantity[]>(
            "quantitiesRowData",
            context.previousQuantities
          );
        }
      },
      onSettled: () => {
        reset();
        queryClient.invalidateQueries("quantities");
        queryClient.invalidateQueries("quantitiesRowData");
      },
    }
  );
}
