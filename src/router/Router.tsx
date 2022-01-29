import { Routes, Route } from "react-router-dom";
import { Customers, Customer } from "pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:id" element={<Customer />} />
    </Routes>
  );
}
