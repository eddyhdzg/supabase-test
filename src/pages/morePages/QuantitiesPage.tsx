import { useEffect } from "react";
import { useHeader } from "hooks";
import { QuantitiesTemplate } from "templates";
import { Seo } from "components";

export default function QuantitiesPage() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: undefined, url: undefined });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Quantities`} description="Quantities page." />
      <QuantitiesTemplate />
    </>
  );
}
