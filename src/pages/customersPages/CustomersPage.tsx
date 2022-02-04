import { useEffect } from "react";
import { useHeader } from "hooks";
import { CustomersTemplate } from "templates";
import { Seo } from "components";

export default function CustomersPage() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: undefined, url: undefined });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Customers`} description="Customers page." />
      <CustomersTemplate />
    </>
  );
}
