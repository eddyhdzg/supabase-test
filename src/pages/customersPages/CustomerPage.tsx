import { useEffect } from "react";
import { useCustomer, useHeader } from "hooks";
import { CustomerTemplate } from "templates";
import { Seo } from "components";
import { useParams } from "react-router-dom";

export default function CustomerPage() {
  const { onChangeRoute } = useHeader();
  const { id } = useParams();
  const { data } = useCustomer(id);

  const name = `${data?.firstName || ""} ${data?.lastName || ""}`;

  useEffect(() => {
    onChangeRoute({ text: "Customer", url: "/customers" });
  }, [onChangeRoute]);

  return (
    <>
      <Seo title={`Customer - ${name}`} description="Customer page." />
      <CustomerTemplate />
    </>
  );
}
