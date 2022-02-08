import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Ingredient } from "types";
import { useSnackbar } from "notistack";
import { UpdateIngredientSchema } from "hooks";
import { UseFormReset } from "react-hook-form";

const createIngredient = async (ingredient?: string) => {
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
        .insert({ ingredient })
        .single();
    });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useCreateIngredient(
  reset: UseFormReset<UpdateIngredientSchema>
) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ({ ingredient }: Pick<Ingredient, "ingredient">) =>
      createIngredient(ingredient),
    {
      onMutate: async (newIngredient: Ingredient) => {
        await queryClient.cancelQueries("ingredientsRowData");
        const previousIngredients =
          queryClient.getQueryData<Ingredient[]>("ingredientsRowData");
        queryClient.setQueryData<Ingredient[]>(
          "ingredientsRowData",
          (ingredients = []) => [...ingredients, newIngredient]
        );

        return { previousIngredients };
      },
      onSuccess: (ingredient) => {
        enqueueSnackbar(`Ingredient with id ${ingredient?.id} created 🔥`, {
          variant: "success",
        });
      },
      onError: (_, __, context) => {
        enqueueSnackbar(`Error: Ingredient not created 😔 `, {
          variant: "error",
        });

        if (context?.previousIngredients) {
          queryClient.setQueryData<Ingredient[]>(
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
    }
  );
}
