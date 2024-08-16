import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterResults,
  setSearchTerm,
} from "../../redux/reducerSlices/itemsSlice";
import searchStyles from "./index.module.css";

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const searchHandle = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(e.target.value));
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(filterResults());
  }, [searchQuery]);

  return (
    <div>
      <input
        className={searchStyles.searchBox}
        type="search"
        name="search"
        id="search"
        placeholder="Search item..."
        value={searchQuery}
        onChange={searchHandle}
      />
    </div>
  );
};
