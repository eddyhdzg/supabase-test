import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { useSnackbar } from "notistack";
import { Recipe } from "types";

interface deleteRecipeProps {
  id: string | number;
}

const deleteRecipe = async (id: string | number) => {
  const { data, error } = await supabase
    .from<Recipe>("recipes")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useDeleteRecipe() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(({ id }: deleteRecipeProps) => deleteRecipe(id), {
    onMutate: async (deletedRecipe: Recipe) => {
      await queryClient.cancelQueries("recipes");
      const previousRecipes = queryClient.getQueryData<Recipe[]>("recipes");
      queryClient.setQueryData<Recipe[]>("recipes", (recipes = []) =>
        recipes.filter((recipes) => recipes.id !== deletedRecipe.id)
      );
      return { previousRecipes };
    },
    onSuccess: (recipe) => {
      enqueueSnackbar(`Recipe with id ${recipe?.id} deleted 🔥`, {
        variant: "success",
      });
    },
    onError: (_, recipe, context) => {
      enqueueSnackbar(`Error: recipe with id ${recipe.id} not edited 😔 `, {
        variant: "error",
      });
      if (context?.previousRecipes) {
        queryClient.setQueryData<Recipe[]>("recipe", context.previousRecipes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("recipes");
      queryClient.invalidateQueries("recipes");
    },
  });
}
