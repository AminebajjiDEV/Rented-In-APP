import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "../partials/ListingCard.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking
}) => {

  const navigate = useNavigate();

  /* IMAGE SLIDER + NEXT & PREV BUTTON  */
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
  }
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
  }

  return (
    <div className="card-container" onClick={() => {
      navigate(`/listings/${listingId}`);
    }}>
      <div className="slider-container" >
        <div className="image-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths?.map((photo, index) => (
            <div className="slider" key={index}>
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div className="prev-button" onClick={(e) => 
              { e.stopPropagation()
                goToPrevSlide(e) }}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={(e) => 
              { e.stopPropagation()
                goToNextSlide(e) }}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>

            </div>
          ))}
        </div>
      </div>
      <h3>{city}, {province}, {country}</h3>
      <p>{category}</p>
      {!booking ? (
        <>
          <p>{type}</p>
          <p><span>${price}</span> /per Night</p>
        </>
      ) : (
        <>
            <p>{startDate} - {endDate} </p>
            <p>Total:<span> ${totalPrice}</span></p>
        </>
      )}
    </div>
  )
}

export default ListingCard;