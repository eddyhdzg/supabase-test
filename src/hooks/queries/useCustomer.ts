import { useQuery } from "react-query";
import { Customer } from "types";

const getCustomer = async (id?: string) => {
  return fetch(`https://www.cocinaunapizca.com/_functions/customer/${id}`, {
    method: "get",
  }).then((res) =>
    res
      .json()
      .then((data: { items?: Customer[] }) => {
        return data?.items?.length ? data.items[0] : {};
      })
      .catch(() => {
        return {};
      })
  );
};

export default function useCustomer(id?: string) {
  return useQuery<Customer, Error>(["customer", id], () => getCustomer(id));
}
