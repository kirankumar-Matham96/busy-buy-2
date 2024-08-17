import filterStyles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterResults,
  itemsSelector,
  setCategories,
  setMaxPrice,
} from "../../redux/reducerSlices/itemsSlice";
import { useEffect, useState } from "react";

/**
 * The `Filter` component provides UI elements to filter items based on categories and price.
 *
 * It utilizes Redux to manage filter states and trigger updates to the item list:
 * - **Category Filter**: Allows users to select multiple categories using checkboxes.
 * - **Price Filter**: Allows users to adjust the maximum price using a range slider.
 *
 * On component mount or when filter values change:
 * - `setCategories` is dispatched to update the selected categories.
 * - `setMaxPrice` is dispatched to update the maximum price filter.
 * - `filterResults` is dispatched to apply the filters to the item list.
 *
 * The component's state includes:
 * - `categoryFilters`: An array of selected category filters.
 * - `priceFilter`: The current value of the price filter.
 *
 * The component uses the following hooks:
 * - `useDispatch` to get the dispatch function for Redux actions.
 * - `useSelector` to access the current list of categories from the Redux store.
 * - `useState` to manage local state for category and price filters.
 * - `useEffect` to handle side effects related to filter changes.
 *
 * @component
 */
export const Filter = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(itemsSelector);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0);

  useEffect(() => {
    dispatch(setCategories(categoryFilters));
    dispatch(setMaxPrice(priceFilter));
    dispatch(filterResults());
  }, [dispatch, categoryFilters, priceFilter]);

  /**
   * Handles category checkbox changes by adding or removing categories from the filter list.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the checkbox input.
   */
  const categorySelectHandle = (e) => {
    if (e.target.checked) {
      setCategoryFilters((prevState) => [
        ...prevState,
        e.target.value.toLowerCase(),
      ]);
    } else {
      setCategoryFilters((prevState) =>
        prevState.filter((category) => category !== e.target.value)
      );
    }
  };

  /**
   * Handles changes to the price range slider and updates the price filter state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the range input.
   */
  const priceChangeHandle = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className={filterStyles.bgContainer}>
      <h2>Filter</h2>
      <div className={filterStyles.priceFilter}>
        <h3>Price: {priceFilter}</h3>
        <input
          type="range"
          name="price"
          id="price"
          min="50"
          max="1000"
          step="10"
          value={priceFilter}
          onChange={priceChangeHandle}
        />
      </div>

      <div className={filterStyles.categoryFilter}>
        <h3>Category</h3>
        <div className={filterStyles.categories}>
          {categories.map((category, index) => (
            <label htmlFor={category} key={index}>
              <input
                type="checkbox"
                id={category}
                value={category}
                onChange={categorySelectHandle}
              />
              &nbsp; {category}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
