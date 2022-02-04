import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { useStore } from "hooks";
import { Search, SearchIconWrapper, StyledInputBase } from "./Searchbar.styled";
import shallow from "zustand/shallow";

export default function Searchbar() {
  const { pathname } = useLocation();
  const [hide, setHide] = useState(true);
  const urls = new Set<string>(["/customers"]);
  const { customers, dispatch } = useStore(
    ({ customers, dispatch }) => ({ customers, dispatch }),
    shallow
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "CUSTOMERS_CHANGE_INPUT", payload: e.target.value });
  };

  useEffect(() => {
    if (urls.has(pathname)) {
      setHide(false);
    } else {
      setHide(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Search
        sx={{
          display: hide ? "none" : undefined,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={onChange}
          value={customers}
        />
      </Search>
    </>
  );
}
