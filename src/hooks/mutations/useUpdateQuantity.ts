import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Quantity, QuantityRowData } from "types";
import { useSnackbar } from "notistack";
import { UpdateQuantitySchema } from "hooks";
import { UseFormReset } from "react-hook-form";

const updateQuantity = async ({ id, quantity }: Quantity) => {
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
        .update({ quantity })
        .eq("id", id)
        .single();
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useUpdateQuantity(
  reset: UseFormReset<UpdateQuantitySchema>
) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation((quantity: Quantity) => updateQuantity(quantity), {
    onMutate: async (updatedQuantity: Quantity) => {
      await queryClient.cancelQueries("quantitiesRowData");
      const previousQuantities =
        queryClient.getQueryData<QuantityRowData[]>("quantitiesRowData");
      queryClient.setQueryData<QuantityRowData[]>(
        "quantitiesRowData",
        (quantities = []) =>
          quantities.map((quantity) =>
            quantity.id !== updatedQuantity.id
              ? quantity
              : {
                  ...quantity,
                  quantity: updatedQuantity?.quantity,
                }
          )
      );
      return { previousQuantities };
    },
    onSuccess: (quantity) => {
      enqueueSnackbar(`Quantity with id ${quantity?.id} edited 🔥`, {
        variant: "success",
      });
    },
    onError: (_, quantity, context) => {
      enqueueSnackbar(`Error: quantity with id ${quantity.id} not edited 😔 `, {
        variant: "error",
      });
      reset();
      if (context?.previousQuantities) {
        queryClient.setQueryData<QuantityRowData[]>(
          "quantitiesRowData",
          context.previousQuantities
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("quantities");
      queryClient.invalidateQueries("quantitiesRowData");
    },
  });
}
