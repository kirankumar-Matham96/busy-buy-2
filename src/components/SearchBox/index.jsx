import searchStyles from "./index.module.css";

export const SearchBox = () => {
  return (
    <div>
      <input
      className ={searchStyles.searchBox}
        type="search"
        name="search"
        id="search"
        placeholder="Search item..."
      />
    </div>
  );
};
