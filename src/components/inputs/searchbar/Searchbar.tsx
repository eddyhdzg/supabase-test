import { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useHasBottomSearch } from "hooks";
import { Search, SearchIconWrapper, StyledInputBase } from "./Searchbar.styled";
import { useSearchParams } from "react-router-dom";

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasBottomSearch = useHasBottomSearch();
  const search = searchParams.get("search") || "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearchParams({
        search: e.target.value,
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Search
        sx={{
          display: hasBottomSearch ? undefined : "none",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={handleChange}
        />
      </Search>
    </>
  );
}
