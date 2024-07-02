import "../partials/PropertyDetails.scss"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { facilities } from "../data"
import Loader from "../components/Loader"
import NavBar from "../components/NavBar"

// for using the calendar component
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { useSelector } from "react-redux"


const PropertyDetails = () => {
    const [loading, setLoading] = useState(true);

    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const navigate = useNavigate();

    const getListingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/listings/${listingId}`, { method: "GET", })
            const data = await response.json()
            setListing(data)
            setLoading(false)
        } catch (err) {
            console.log("Failed to fetch listing details", err.message)
        }
    }
    useEffect(() => {
        getListingDetails()
    }, [])

    console.log("Current listing state:", listing); // for debugging

    /* THE BOOKING  CALENDAR */
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])
    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]) // the selected date range is updated when the user makes a selection
    };

    /* SUBMIT USER BOOKING */
    const customerId = useSelector((state) => state?.user?._id) // to select the id of the user that logs in
    const handleSubmit = async () => {
        try {
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
                totalPrice: listing.price * nightCount,
            }
            const response = await fetch("http://localhost:3001/bookings/create",
                {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingForm)
                })
            if (response.ok) {
                navigate(`/${customerId}/trips`)
            }
        } catch (err) {
console.log("Submiting Bokking Failed!", err.message)
        }
    }

    const start = new Date(dateRange[0].startDate)
    const end = new Date(dateRange[0].endDate)
    const nightCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) // Calculate the difference in days unit


    return loading ? (
        <Loader />
    ) : (
        <>
            <NavBar />

            <div className="listing-container">
                <div className="listing-title">
                    <h1>{listing.title}</h1>
                    <div className="fav-button"></div>
                </div>
                <div className="photos">
                    {listing.listingPhotoPaths?.map((photo) => (
                        <img src={`http://localhost:3001/${photo.replace("public", "")}`} alt="property-photos" />
                    ))}
                </div>
                <h2>{listing.type} in {listing.city}, {listing.country}</h2>
                <p>{listing.guestCount}: guests - {listing.bedroomCount}: bedroom(s) - {listing.bedCount}: bed(s) - {listing.bathroomCount}: bathroom(s)</p>
                <hr />
                <div className="creator-profile">
                    <img src={`http://localhost:3001/${listing.creator.profilePicturePath.replace("public", "")}`} alt="" />
                    <h3>Hosted by {listing.creator.firstName} {listing.creator.lastName}</h3>
                </div>
                <hr />

                <h3>About this place</h3>
                <p>{listing.description}</p>

                <hr />

                <h3>{listing.highlight}</h3>
                <p>{listing.highlightDesc}</p>

                <hr />

                <div className="booking">
                    <h2>What this place offers</h2>
                    <div className="amenities">
                        {listing.amenities[0].split(",").map((item, index) => (
                            <div className="facility" key={index}>
                                <div className="facility_icon">
                                    {facilities.find((facility) => facility.name === item)?.icon}
                                </div>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                    <h2>Select check-in date</h2>
                    <div className="date-range-calendar">
                        <DateRange ranges={dateRange} onChange={handleSelect} />
                        {nightCount > 1 ? (
                            <h2>${listing.price} x ${nightCount} nights</h2>
                        ) : (
                            <h2>${listing.price} x ${nightCount} night</h2>
                        )}

                        <h2>Total:  ${listing.price * nightCount}</h2>
                        <h2>Check-In:  ${dateRange[0].startDate.toDateString()}</h2>
                        <h2>Check-Out:  ${dateRange[0].endDate.toDateString()}</h2>

                        <button className="book-button" type="submit" onClick={handleSubmit}>Book Now!</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyDetails