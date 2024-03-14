import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
} from "../redux/productSlice";

const ProductList = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const products = useSelector((state) => state.product.products);
  const [page, setPage] = useState(1);

  const handleSort = (e) => {
    const sort = {
      _sort: e.target.attributes[2].value,
      _order: e.target.attributes[1].value,
    };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  const handleFilter = (e) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter["category"]) {
        newFilter["category"].push(e.target.value);
      } else {
        newFilter["category"] = [e.target.value];
      }
    } else {
      const index = newFilter["category"].findIndex(
        (el) => el === e.target.value
      );
      newFilter["category"].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
    // const newFilter = { ...filter, category: e.target.value };
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const pagination = { _page: page, _limit: 100 };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);
  return (
    <div className="catertoryfilter">
      <div className="filternavbar">
        <div className="dropdown-wrapper">
          <div
            className="sort1"
            onClick={() => {
              setOpen1(!open1);
            }}
          >
            Sort<span>&#8964;</span>
          </div>
          <div className={`dropdown-menu2 ${open1 ? "active" : "inactive"}`}>
            <div
              className="drop-option"
              onClick={(e) => handleSort(e)}
              order="desc"
              sort="rating"
            >
              Best Rating
            </div>
            <div
              className="drop-option"
              onClick={(e) => handleSort(e)}
              order="asc"
              sort="price"
            >
              Price: Low to High
            </div>
            <div
              className="drop-option"
              onClick={(e) => handleSort(e)}
              order="desc"
              sort="price"
            >
              Price: High to Low
            </div>
          </div>
        </div>
        <div className="filter-right ">
          <div
            className="sort1 "
            onClick={() => {
              setOpen2(!open2);
            }}
          >
            Category<span>&#8964;</span>
          </div>
          <div className={`dropdown-menu3 ${open2 ? "active" : "inactive"}`}>
            <div className="drop-option">
              <input
                value={"laptops"}
                type="checkbox"
                onChange={(e) => handleFilter(e)}
              />{" "}
              laptop
            </div>
            <div className="drop-option">
              <input
                value={"fragrances"}
                type="checkbox"
                onChange={(e) => handleFilter(e)}
              />{" "}
              fragrances
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"skincare"}
                type="checkbox"
              />{" "}
              skincare
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"groceries"}
                type="checkbox"
              />{" "}
              groceries
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"furniture"}
                type="checkbox"
              />{" "}
              furniture
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"mens-shirts"}
                type="checkbox"
              />{" "}
              mens-shirts
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"mens-watches"}
                type="checkbox"
              />{" "}
              mens-watches
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"smartphones"}
                type="checkbox"
              />{" "}
              smartphones
            </div>
            <div className="drop-option">
              <input
                onChange={(e) => handleFilter(e)}
                value={"home-decoration"}
                type="checkbox"
              />{" "}
              home-decoration
            </div>
          </div>
        </div>
      </div>

      {/* products  */}
      <div className="ProductList">
        <div className="ProductList_div">
          <h2>Product</h2>

          <div className="ProductList_main">
            {products.map((product) => (
              <div key={product.id} className="Product_key">
                <div className="Produt_image">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="Product_content">
                  <div>
                    <h3>
                      <a href={product.thumbnail}>
                        <span aria-hidden="true" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="Product_color">⭐{product.rating}</p>
                  </div>
                  <p>
                    <span
                      style={{
                        color: "grey",
                        textDecoration: "line-through",
                      }}
                    >
                      ${product.price}
                    </span>
                    <br />$
                    {Math.round(
                      product.price * (1 - product.discountPercentage / 100)
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
