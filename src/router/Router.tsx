import { Routes, Route, Navigate } from "react-router-dom";
import {
  CustomersPage,
  CustomerPage,
  MorePage,
  IngredientsPage,
  UnitsPage,
} from "pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/:id" element={<CustomerPage />} />
      <Route path="/ingredients" element={<IngredientsPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/more/units" element={<UnitsPage />} />
      <Route path="*" element={<Navigate to="/customers" />} />
    </Routes>
  );
}
