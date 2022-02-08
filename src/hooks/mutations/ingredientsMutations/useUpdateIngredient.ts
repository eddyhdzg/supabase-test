import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Ingredient, IngredientRowData } from "types";
import { useSnackbar } from "notistack";
import { UpdateIngredientSchema } from "hooks";
import { UseFormReset } from "react-hook-form";

const updateIngredient = async ({ id, ingredient }: Ingredient) => {
  const { data, error } = await supabase
    .from<Ingredient>("ingredients")
    .select("*")
    .eq("ingredient", ingredient)
    .then(async (res) => {
      if (res.data?.length) {
        throw new Error("Duplicated");
      }
      return await supabase
        .from<Ingredient>("ingredients")
        .update({ ingredient })
        .eq("id", id)
        .single();
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useUpdateIngredient(
  reset: UseFormReset<UpdateIngredientSchema>
) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation((ingredient: Ingredient) => updateIngredient(ingredient), {
    onMutate: async (updatedIngredient: Ingredient) => {
      await queryClient.cancelQueries("ingredientsRowData");
      const previousIngredients =
        queryClient.getQueryData<IngredientRowData[]>("ingredientsRowData");
      queryClient.setQueryData<IngredientRowData[]>(
        "ingredientsRowData",
        (ingredients = []) =>
          ingredients.map((ingredient) =>
            ingredient.id !== updatedIngredient.id
              ? ingredient
              : {
                  ...ingredient,
                  ingredient: updatedIngredient?.ingredient,
                }
          )
      );
      return { previousIngredients };
    },
    onSuccess: (ingredient) => {
      enqueueSnackbar(`Ingredient with id ${ingredient?.id} edited 🔥`, {
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
        queryClient.setQueryData<IngredientRowData[]>(
          "ingredientsRowData",
          context.previousIngredients
        );
      }
    },
    onSettled: () => {
      reset();
      queryClient.invalidateQueries("ingredients");
      queryClient.invalidateQueries("ingredientsRowData");
    },
  });
}
