import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import ListingCard from "../components/ListingCard"
import { setReservationList } from "../redux/state"
import "../partials/ReservationsList.scss"



const ReservationsList = () => {
    const [loading, setLoading] = useState(true)
    const userId = useSelector((state) => state.user._id)
    const reservationList = useSelector((state) => state.user.reservationList)
    const dispatch = useDispatch()

    const getReservationList = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/users/${userId}/reservations-list`, {
                method: "GET"
            })
            const data = await response.json();
            dispatch(setReservationList(data));
            setLoading(false);

        } catch (err) {
            console.log("Fetching Reseravtions List Failed", err.message)
        }
    }

    useEffect(() => {
        getReservationList();
    }, []);

    return loading ? (
        <Loader />) : (
        <>
            <div className="main-container">
                <NavBar />
                <div className="reservation-container">
                    <h2 className="">-Reservations-</h2>
                    <hr />
                    <div className="reservation-content">
                        <div className="reservation-list">
                            {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
                                <ListingCard
                                    listingId={listingId._id}
                                    creator={hostId._id}
                                    listingPhotoPaths={listingId.listingPhotoPaths}
                                    city={listingId.city}
                                    province={listingId.province}
                                    country={listingId.country}
                                    category={listingId.category}
                                    startDate={startDate}
                                    endDate={endDate}
                                    totalPrice={totalPrice}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationsList