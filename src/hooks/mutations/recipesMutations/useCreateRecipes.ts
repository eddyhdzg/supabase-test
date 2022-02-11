import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Recipe } from "types";
import { useSnackbar } from "notistack";

interface NewRecipe {
  _id: string;
  name: string;
}

export type createRecipeProps = NewRecipe[];

const createRecipe = async (array: createRecipeProps) => {
  const { data, error } = await supabase.from<Recipe>("recipes").insert(array);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useCreateRecipes() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation((props: createRecipeProps) => createRecipe(props), {
    onSuccess: () => {
      enqueueSnackbar(`Recipes updated! 🔥`, {
        variant: "success",
      });
    },
    onError: (_, __, context) => {
      console.log(context);
      enqueueSnackbar(`Error: Recipes not updated 😔 `, {
        variant: "error",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("recipes");
    },
  });
}
