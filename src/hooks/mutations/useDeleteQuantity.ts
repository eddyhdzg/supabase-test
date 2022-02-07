import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { useSnackbar } from "notistack";
import { Quantity, QuantityRowData } from "types";

interface deleteQuantityProps {
  id: string;
}

const deleteQuantity = async (id: string) => {
  const { data, error } = await supabase
    .from<Quantity>("quantities")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useDeleteQuantity() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(({ id }: deleteQuantityProps) => deleteQuantity(id), {
    onMutate: async (deletedQuantity: Quantity) => {
      await queryClient.cancelQueries("quantitiesRowData");
      const previousQuantities =
        queryClient.getQueryData<QuantityRowData[]>("quantitiesRowData");
      queryClient.setQueryData<QuantityRowData[]>(
        "quantitiesRowData",
        (quantities = []) =>
          quantities.filter(
            (quantities) => quantities.id !== deletedQuantity.id
          )
      );
      return { previousQuantities };
    },
    onSuccess: (quantity) => {
      enqueueSnackbar(`Quantity with id ${quantity?.id} deleted 🔥`, {
        variant: "success",
      });
    },
    onError: (_, quantity, context) => {
      enqueueSnackbar(`Error: quantity with id ${quantity.id} not edited 😔 `, {
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
      queryClient.invalidateQueries("quantities");
      queryClient.invalidateQueries("quantitiesRowData");
    },
  });
}
