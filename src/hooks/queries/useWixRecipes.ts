import { useQuery } from "react-query";
import { WixRecipes } from "types";

const getWixRecipes = async () => {
  return fetch("https://www.cocinaunapizca.com/_functions/recipes", {
    method: "get",
  }).then((res) =>
    res
      .json()
      .then((data: { items?: WixRecipes[] }) => {
        return data?.items?.length ? data.items : [];
      })
      .catch(() => {
        return [];
      })
  );
};

export default function useWixRecipes() {
  return useQuery<WixRecipes[], Error>("wixRecipes", getWixRecipes);
}
