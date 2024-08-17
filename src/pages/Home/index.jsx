import { useEffect } from "react";
import { SearchBox } from "../../components/SearchBox";
import { ItemsContainer } from "../../components/ItemsContainer";
import { Filter } from "../../components/Filter";
import homeStyles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  itemsSelector,
  getInitialState,
} from "../../redux/reducerSlices/itemsSlice";
import { Loader } from "../../components/Loader";

/**
 * `Home` is a React functional component that serves as the main page of the application.
 *
 * This component integrates various UI elements including a search box, an item display container, and a filter component. It also handles loading states and dispatches actions to initialize the data required for rendering.
 *
 * - **UI Elements**:
 *   - `SearchBox`: Allows users to search for items.
 *   - `ItemsContainer`: Displays a list of items based on the search and filter criteria.
 *   - `Filter`: Provides filtering options for the items.
 *   - `Loader`: Displays a loading spinner while data is being fetched.
 * - **Styles**:
 *   - Uses `homeStyles` for styling the layout and containers.
 *
 * - **Redux Integration**:
 *   - Uses `useDispatch` to dispatch actions.
 *   - Uses `useSelector` to access the `items` and `loading` state from the Redux store.
 *   - Dispatches `getInitialState` to fetch the initial data for items.
 *
 * @returns {React.ReactElement} The JSX element representing the home page layout with search, item display, and filter components.
 */
export const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(itemsSelector);

  useEffect(() => {
    dispatch(getInitialState());
  }, []);

  return (
    <div className={homeStyles.bgContainer}>
      <div className={homeStyles.searchContainer}>
        <SearchBox />
      </div>
      {loading ? <Loader /> : <ItemsContainer items={items} />}
      <div className={homeStyles.filterContainer}>
        <Filter />
      </div>
    </div>
  );
};
