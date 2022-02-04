import { useQuery } from "react-query";
import { Customer } from "types";

const getCustomers = async () => {
  return fetch("https://www.cocinaunapizca.com/_functions/customers", {
    method: "get",
  }).then((res) =>
    res
      .json()
      .then((data: { items?: Customer[] }) => {
        return data?.items?.length ? data.items : [];
      })
      .catch(() => {
        return [];
      })
  );
};

export default function useCustomers() {
  return useQuery<Customer[], Error>("customers", getCustomers);
}
