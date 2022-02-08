import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { useSnackbar } from "notistack";
import { Ingredient, IngredientRowData } from "types";

interface deleteIngredientProps {
  id: string;
}

const deleteIngredient = async (id: string) => {
  const { data, error } = await supabase
    .from<Ingredient>("ingredients")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useDeleteIngredient() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(({ id }: deleteIngredientProps) => deleteIngredient(id), {
    onMutate: async (deletedIngredient: Ingredient) => {
      await queryClient.cancelQueries("ingredientsRowData");
      const previousIngredients =
        queryClient.getQueryData<IngredientRowData[]>("ingredientsRowData");
      queryClient.setQueryData<IngredientRowData[]>(
        "ingredientsRowData",
        (ingredients = []) =>
          ingredients.filter(
            (ingredients) => ingredients.id !== deletedIngredient.id
          )
      );
      return { previousIngredients };
    },
    onSuccess: (ingredient) => {
      enqueueSnackbar(`Ingredient with id ${ingredient?.id} deleted 🔥`, {
        variant: "success",
      });
    },
    onError: (_, ingredient, context) => {
      enqueueSnackbar(
        `Error: Ingredient with id ${ingredient.id} not edited 😔 `,
        {
          variant: "error",
        }
      );
      if (context?.previousIngredients) {
        queryClient.setQueryData<Ingredient[]>(
          "ingredientsRowData",
          context.previousIngredients
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("ingredients");
      queryClient.invalidateQueries("ingredientsRowData");
    },
  });
}
