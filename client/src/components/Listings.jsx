import "../partials/Listings.scss"
import { categories } from "../data";
import ListingCard from "./ListingCard"
import Loader from "./Loader"
import { setListings } from "../redux/state"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";



const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/listings?category=${selectedCategory}`
          : "http://localhost:3001/listings",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log(listings)

  return (
    <>
      <div className="category_container">
        <h3>Find the category what's perfect for you</h3>
        <div className="category-list">
          {categories?.map((category, index) => (
            <div className={`category ${category.label === selectedCategory ? "selected" : ""}`}
              key={index} onClick={() => setSelectedCategory(category.label)}>
              <div className='category_icon'>{category.icon}</div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      </div>
      {loading ? (
        <Loader className="loader" />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  )
}

export default Listings;