import { Routes, Route, Navigate } from "react-router-dom";
import {
  CustomersPage,
  CustomerPage,
  MorePage,
  IngredientsPage,
  UnitsPage,
  RecipePage,
  RecipesPage,
} from "pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/:id" element={<CustomerPage />} />

      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />

      <Route path="/ingredients" element={<IngredientsPage />} />

      <Route path="/more" element={<MorePage />} />
      <Route path="/more/units" element={<UnitsPage />} />

      <Route path="*" element={<Navigate to="/customers" />} />
    </Routes>
  );
}
