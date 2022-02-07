import { useEffect } from "react";
import { useHeader } from "hooks";
import { MoreTemplate } from "templates";
import { Seo } from "components";

export default function MorePage() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: undefined, url: undefined });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`More`} description="More page." />
      <MoreTemplate />
    </>
  );
}
