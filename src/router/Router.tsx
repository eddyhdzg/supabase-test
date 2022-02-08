import { Routes, Route, Navigate } from "react-router-dom";
import {
  CustomersPage,
  CustomerPage,
  MorePage,
  QuantitiesPage,
  UnitsPage,
} from "pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/:id" element={<CustomerPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/more/quantities" element={<QuantitiesPage />} />
      <Route path="/more/units" element={<UnitsPage />} />
      <Route path="*" element={<Navigate to="/customers" />} />
    </Routes>
  );
}
