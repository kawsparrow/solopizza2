import React from "react";
import qs from "qs";

import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { useNavigate, Link } from "react-router-dom";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
  };

  // თუ შეიცვალა პარამეტრები და იყო პირველი რენდერი მაშინ ეს ეფფეცტი იქნება >
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // თუ იყო პირველი რენდერი, ვამოწმებთ ურლ პარამეტრებს და ვასეივებთ რედუქსსში
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  // პირველი რენდერის შემდეგ ვითხოვთ პიცის მონაცემებს
  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    .filter((obj) => {
      return !!obj.title.includes(searchValue);
    })
    .map((obj) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">ყველა პიცა</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>დაფიქსირდა შეცდომა 😕</h2>
          <p>
            {" "}
            სამწუხაროდ ვერ მოხდა პიცების გამომჟღავნება, სცადეთ მოგვიანებით.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
