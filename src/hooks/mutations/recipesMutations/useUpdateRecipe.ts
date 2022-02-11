import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Recipe } from "types";
import { useSnackbar } from "notistack";
import { UpdateRecipeSchema } from "hooks";
import { UseFormReset } from "react-hook-form";

interface updateRecipeProps {
  id?: string | number;
  column: string;
  value: string | number;
}

const updateRecipe = async ({ id, column, value }: updateRecipeProps) => {
  const { data, error } = await supabase
    .from<Recipe>("recipes")
    .update({
      [column]: value,
    })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useUpdateRecipe(
  reset: UseFormReset<UpdateRecipeSchema>
) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation((props: updateRecipeProps) => updateRecipe(props), {
    onMutate: async (updatedRecipe) => {
      await queryClient.cancelQueries("recipes");
      const previousRecipes = queryClient.getQueryData<Recipe[]>("recipes");
      queryClient.setQueryData<Recipe[]>("recipes", (recipes = []) =>
        recipes.map((recipe) => {
          return recipe.id !== updatedRecipe.id
            ? recipe
            : { ...recipe, [updatedRecipe.column]: updatedRecipe.value };
        })
      );
      return { previousRecipes };
    },
    onSuccess: (recipe) => {
      enqueueSnackbar(`Recipe with id ${recipe?.id} edited 🔥`, {
        variant: "success",
      });
    },
    onError: (_, recipe, context: any) => {
      enqueueSnackbar(`Error: Recipe with id ${recipe.id} not edited 😔 `, {
        variant: "error",
      });
      if (context?.previousRecipes) {
        queryClient.setQueryData<Recipe[]>("recipes", context.previousRecipes);
      }
    },
    onSettled: () => {
      reset();
      queryClient.invalidateQueries("recipes");
    },
  });
}
