import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FastfoodIcon from "@mui/icons-material/Fastfood";

export const drawerWidth = 240;

export const links = [
  {
    href: "/list",
    Icon: ShoppingCartIcon,
    route: "List",
  },
  {
    href: "/customers",
    Icon: PeopleIcon,
    route: "Customers",
  },
  {
    href: "/recipes",
    Icon: MenuBookIcon,
    route: "Recipes",
  },
  {
    href: "/ingredients",
    Icon: FastfoodIcon,
    route: "Ingredients",
  },
];

export const customersSearchFilters = [
  "_id",
  "firstName",
  "lastName",
  "email",
  "street",
  "zipCode",
  "state",
  "phoneNumber",
  "customerSID",
];
