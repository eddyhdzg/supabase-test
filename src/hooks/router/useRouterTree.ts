import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export type RouterTree = {
  [key: string]: {
    title: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
  };
};

const useRouterTree = () => {
  const routerTree: RouterTree = {
    // "/list": {
    //   title: "List",
    //   Icon: ShoppingCartIcon,
    // },
    "/customers": {
      title: "Customers",
      Icon: PeopleIcon,
    },
    "/recipes": {
      title: "Recipes",
      Icon: MenuBookIcon,
    },
    "/ingredients": {
      title: "Ingredients",
      Icon: FastfoodIcon,
    },
    "/more": {
      title: "More",
      Icon: MoreHorizIcon,
    },
  };

  return routerTree;
};

export default useRouterTree;
