import { useEffect } from "react";
import { useHeader } from "hooks";
import { RecipesTemplate } from "templates";
import { Seo } from "components";

export default function RecipesPage() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: undefined, url: undefined });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Recipes`} description="Recipes page." />
      <RecipesTemplate />
    </>
  );
}
