import { useEffect } from "react";
import { useHeader } from "hooks";
import { IngredientsTemplate } from "templates";
import { Seo } from "components";

export default function IngredientsPage() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: undefined, url: undefined });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Ingredients`} description="Ingredients page." />
      <IngredientsTemplate />
    </>
  );
}
