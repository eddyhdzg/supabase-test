import { useEffect } from "react";
import { useHeader, useRecipe } from "hooks";
import { RecipeTemplate } from "templates";
import { Seo } from "components";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  const { onChangeRoute } = useHeader();
  const { id } = useParams();
  const { data } = useRecipe(id);
  const name = `${data?.name || ""}`;

  useEffect(() => {
    onChangeRoute({ text: "Recipes", url: "/recipes" });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Recipe - ${name}`} description="Recipe page." />
      <RecipeTemplate />
    </>
  );
}
