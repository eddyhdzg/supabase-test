import { useEffect } from "react";
import { useHeader } from "hooks";
import { UnitsTemplate } from "templates";
import { Seo } from "components";

export default function UnitsPage() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: undefined, url: undefined });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Units`} description="Units page." />
      <UnitsTemplate />
    </>
  );
}
