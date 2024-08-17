import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterResults,
  setSearchTerm,
} from "../../redux/reducerSlices/itemsSlice";
import searchStyles from "./index.module.css";

/**
 * `SearchBox` is a React functional component that provides a search input field for filtering items.
 * 
 * The component uses `useState` to manage the local state for the search query (`searchQuery`), and `useDispatch` to dispatch actions to the Redux store.
 * 
 * - **State Management**: `searchQuery` holds the current value of the search input.
 * - **Event Handling**: 
 *   - `searchHandle`: Updates the search query state and dispatches the `setSearchTerm` action to update the search term in the Redux store.
 * - **Effects**:
 *   - `useEffect`: Triggers the `filterResults` action whenever the `searchQuery` changes, causing the items to be filtered based on the search term.
 * 
 * The component renders:
 * - An input field of type `search` with a placeholder text "Search item...".
 * - The input field is controlled by the `searchQuery` state and updates it on change events.
 * 
 * @returns {React.ReactElement} The JSX element containing the search input field styled with `searchStyles`.
 */
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
  }, [dispatch, searchQuery]);

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
