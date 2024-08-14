import filterStyles from "./index.module.css";

export const Filter = () => {
  return (
    <div className={filterStyles.bgContainer}>
      <h2>Filter</h2>
      <div className={filterStyles.priceFilter}>
        <h3>Price</h3>
        <input type="range" name="price" id="price" min="50" max="10000" />
      </div>

      <div className={filterStyles.categoryFilter}>
        <h3>Category</h3>
        <div className={filterStyles.categories}>
          <label htmlFor="Mens">
            <input type="checkbox" id="Mens" />
            &nbsp; Mens Wear
          </label>
          <label htmlFor="Womens">
            <input type="checkbox" id="Womens" />
            &nbsp; Womens Wear
          </label>
          <label htmlFor="Electronincs">
            <input type="checkbox" id="Electronincs" />
            &nbsp; Electronics
          </label>
          <label htmlFor="Jwelery">
            <input type="checkbox" id="Jwelery" />
            &nbsp; Jwelery
          </label>
        </div>
      </div>
    </div>
  );
};
