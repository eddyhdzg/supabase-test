import { Routes, Route } from "react-router-dom";
import { CustomersPage, CustomerPage } from "pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/:id" element={<CustomerPage />} />
      <Route path="/recipes" element={<CustomersPage />} />
    </Routes>
  );
}
