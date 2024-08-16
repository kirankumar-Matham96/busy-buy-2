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
