import filterStyles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterResults,
  itemsSelector,
  setCategories,
  setMaxPrice,
} from "../../redux/reducerSlices/itemsSlice";
import { useEffect, useState } from "react";

export const Filter = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(itemsSelector);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0);

  useEffect(() => {
    dispatch(setCategories(categoryFilters));
    dispatch(setMaxPrice(priceFilter));
    dispatch(filterResults());
  }, [categoryFilters, priceFilter]);

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
            <label htmlFor="category" key={index}>
              <input
                type="checkbox"
                id="category"
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
