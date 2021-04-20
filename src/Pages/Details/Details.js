import React, { useState, useEffect } from "react";
import Header from "../../Shared/Header";
import Popup from "../../Shared/Popup";
import "./style.css";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

function Details({ match }) {
  useEffect(() => {
    fetchDetails();
    console.log(match);
  }, []);

  const [popUp, setPopUp] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    const data = await fetch(
      `https://zax5j10412.execute-api.ap-southeast-1.amazonaws.com/dev/api/product/${match.params.id}`
    );
    const details = await data.json();
    console.log(details.value);
    setDetails(details.value);
  };

  return (
    <div className="mainContainer">
      <Header />

      <div className="detailsContainer">
        <img
          classsName="leftContDetail"
          alt="image"
          key={details.id}
          src={details.image}
        />
        <div className="rightContDetail">
          <div className="detailsName">{details.name}</div>
          <p style={{ fontSize: "1.5em" }}>
            {details.grapeVarieties} {details.vintageYear}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: "1.5em" }}>S$ {details.price}</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              {/* ADD CART */}
              <button
                className="addCart"
                onClick={() => {
                  // setSelectedItem(item.name);
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
                {/* {selectedItem} */}
                {details.name} added to cart!
              </Popup>
              {/* BOOKMARK */}
              <button
                onClick={() => {
                  // setSelectedBookmark(item.name);
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
                {/* {selectedBookmark} */}
                {details.name} bookmarked!
              </Popup>
            </div>
          </div>
          <div className="midDetails">
            <div>
              <p className="titles">Region</p>
              <p>
                {details.country} . {details.region}
              </p>
            </div>
            <div>
              <p className="titles">Producer</p>
              <p>{details.producer}</p>
            </div>
            <div>
              <p className="titles">Bottle</p>
              <p>{details.bottleSize} ml</p>
            </div>
            <div>
              <p className="titles">Alcohol</p>
              <p>{details.alcohol}%</p>
            </div>
          </div>
          <div>
            <p className="titles">Description</p>
            <p>{details.description}</p>
          </div>
          <div>
            <p className="titles">Tasting Notes</p>
            <p>{details.tastingNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
