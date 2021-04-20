import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { BiCaretDownCircle } from "react-icons/bi";

import Popup from "../../Shared/Popup";
import Header from "../../Shared/Header";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

function Home(props) {
  const [popUp, setPopUp] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [infinityScroll, setInfinityScroll] = useState(false);
  const ref = useRef();

  useEffect(() => {
    fetchProducts().then((res) => {
      window.addEventListener("scroll", (e) => {
        const loaderPosition =
          document.documentElement.scrollTop || document.body.scrollTop;

        const currentHeight = document.documentElement.scrollHeight;
        console.log(currentHeight - loaderPosition);
        if (
          ref.current.children[0].className === "loader" &&
          1053 + loaderPosition === currentHeight
        ) {
          continuousScroll();
        }
      });
    });
  }, [infinityScroll]);

  const fetchProducts = async () => {
    const data = await fetch(
      "https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=1"
    );
    const products = await data.json();
    console.log(products.value);
    setProducts(products.value.products);
  };

  // const clicked = () => {
  //   history.push(`/details/${item.id}`);
  // };

  const loadMore = async () => {
    setCurrentPage((prevState) => prevState + 1);
    setInfinityScroll(true);
    const data = await fetch(
      "https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=2"
    );
    const products = await data.json();
    console.log(products.value);
    products.value.products.map((value, index) => {
      setProducts((prevState) => [...prevState, value]);
    });
  };
  console.log(currentPage);

  const continuousScroll = async () => {
    setCurrentPage((prevState) => prevState + 1);
    setInfinityScroll(true);
    const data = await fetch(
      `https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/list?page=${
        currentPage + 1
      }`
    );
    const products = await data.json();
    console.log(products.value);
    products.value.products.map((value, index) => {
      setProducts((prevState) => [...prevState, value]);
    });
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        <div className="container">
          {products.map((item) => (
            <>
              {/* CARD */}
              <div className="card" key={item.id}>
                <img classsName="img" key={item.id} src={item.image} />
                <div className="leftSide">
                  <Link to={`/details/${item.id}`}>
                    <div
                      className="topSide"
                      // onClick={() => clicked(item.id)}
                    >
                      <div className="productName">
                        {item.name} {item.vintageYear}
                      </div>
                      <div>
                        {item.region}, {item.country}
                      </div>
                      <br></br>
                      <div>{item.grapeVarietes}</div>
                      <br></br>
                    </div>
                  </Link>

                  <div key={item.id}>
                    <div style={{ color: "red" }}>
                      {item.qty < 5 ? item.qty + " left" : null}
                    </div>
                    <div className="price">S$ {item.price}</div>
                    <div className="lowerSide">
                      {/* ADD CART */}
                      <button
                        className="addCart"
                        onClick={() => {
                          setSelectedItem(item.name);
                          setPopUp(true);
                        }}
                      >
                        ADD TO CART
                      </button>
                      <Popup trigger={popUp}>
                        <button
                          className="popupclosebtn"
                          onClick={() => setPopUp(false)}
                        >
                          Close
                        </button>
                        {selectedItem} added to cart!
                      </Popup>

                      {/* BOOKMARK */}
                      <button
                        onClick={() => {
                          setSelectedBookmark(item.name);
                          setBookmark(true);
                        }}
                        style={{ border: "none" }}
                      >
                        <BsBookmark size="2.5em" color="#cc962c" />
                      </button>
                      <Popup trigger={bookmark}>
                        <button
                          className="popupclosebtn"
                          onClick={() => setBookmark(false)}
                        >
                          Close
                        </button>
                        {selectedBookmark} bookmarked!
                      </Popup>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div style={{ padding: "1em" }}></div>
      <div ref={ref} id="loadmore" className="loadmore">
        {infinityScroll ? (
          <Loader
            className="loader"
            type="Circles"
            color="gray"
            height={30}
            width={30}
            // timeout={3000} //3 secs
          />
        ) : (
          <h2 className="loadMore" onClick={() => loadMore()}>
            More{" "}
            <span>
              <BiCaretDownCircle />
            </span>
          </h2>
        )}
      </div>
    </>
  );
}

export default Home;
