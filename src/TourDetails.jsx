import { useState, useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useNavigate, useParams } from "react-router-dom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

export function TourDetails({ tour, setTour }) {
    return (
        <div>
            <div className='tour-bg'>
                <p>All Tours</p>
            </div>
            <TourContainer tour={tour} setTour={setTour} />
        </div>
    );
}

function TourContainer({ tour, setTour }) {
    const getProducts = () => {
        fetch("https://travel-backend-three.vercel.app/tours",
            { method: "GET" })
            .then((data) => data.json())
            .then((dts) => setTour(dts))
    }
    useEffect(() => getProducts(), [])
    return (
        <div className="tour-details">
            <div className='tour-container'>
                {tour.map((tour, index, id) => <ToursList tour={tour} key={index} id={id} />)}
            </div>
        </div>
    )
}

function ToursList({ tour, id }) {
    const navigate = useNavigate()
    return (
        <div className="tour-card">
            <img src={tour.img} />
            <div className="tour-content">
                <div className="tour-location">
                    <p><span><LocationOnIcon fontSize="small" /></span>{tour.location}</p>
                    <p><span><StarOutlineIcon fontSize="small" /></span>{tour.rating}</p>
                </div>
                <p className="tour-place">{tour.place}</p>
                <div className="tour-booking">
                    <p><span className="rate-icon"><CurrencyRupeeIcon fontSize="small" /> {tour.rate}</span>/person</p>
                    <p className="tour-btn" onClick={() => navigate(`/tours/${tour.id}`)}>Book </p>
                </div>
            </div>
        </div>
    )
}


export function TourFeatures() {
    const { id } = useParams()
    const [tour, setTour] = useState([])
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        userId: "01",
        userEmail: "example@email.com",
        fullName: "",
        phone: "",
        guestSize: 1,
        bookAt: ""
    })

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const serviceFee = 100
    const totalAmount = Number(tour.rate) * Number(credentials.guestSize) + Number(serviceFee)
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     console.log(credentials)
    //     navigate("/thank-you")
    // }
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    const handleClick = (e) => {
        e.preventDefault()
        if (totalAmount === '') {
            alert("please enter amount")
        }
        else {
            var option = {
                key: "rzp_test_teSKDfmwTCTFu0",
                key_secret: "2TZaVrFSXYnzzu3QeH6N3t3w",
                amount: totalAmount * 100,
                currency: "INR",
                name: "Travel Blog",
                description: "For Booking Ticket",
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                    navigate("/thank-you")
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 5000)
                },
                prefill: {
                    name: credentials.fullName,
                    email: credentials.userEmail,
                    contact: credentials.phone,
                },
                notes: {
                    address: "Razor pay corporate office"
                },
                theme: {
                    color: "#3399cc"
                }

            }
            var pay = new window.Razorpay(option)
            pay.open()

        }

    }
    useEffect(() => {
        fetch(`https://travel-backend-three.vercel.app/tours/${id}`)
            .then((data) => data.json())
            .then((dts) => setTour(dts));
    }, [id]);
    return (
        <div className="tour-feature">
            <div className="tour-description">
                <img src={tour.img} />
                <div className="card-features">
                    <p className="tour-place title">{tour.place}</p>
                    <div className="icons">
                        <p><span className="rating"><StarOutlineIcon fontSize="small" /></span>{tour.rating}</p>
                        <p><span><LocationOnIcon fontSize="small" /></span>{tour.location}</p>
                        <p><span className="rate"><CurrencyRupeeIcon fontSize="small" /> {tour.rate}</span>/person</p>
                        <p><span><ModeOfTravelIcon fontSize="small" /></span>{tour.km}</p>
                    </div>
                    <div className="description">
                        <h2>Description</h2>
                        <p>{tour.description}</p>
                    </div>
                </div>
            </div>
            <div className="payment">
                <div className="icon-flex">
                    <p><span className="rate-icon"><CurrencyRupeeIcon fontSize="small" /> {tour.rate}</span>/person</p>
                    <p><span className="rating"><StarOutlineIcon fontSize="small" /></span>{tour.rating}</p>
                </div>
                <p className="title">Payment Details</p>
                <form onSubmit={handleClick}>
                    <input type="text" placeholder="Firstname" id="fullName" onChange={handleChange} required></input>
                    <input type="number" placeholder="Phone number" id="phone" onChange={handleChange} required></input>
                    <div className="date">
                        <input type="date" id="bookAt" onChange={handleChange} required></input>
                        <input type="number" placeholder="Persons" id="guestSize" onChange={handleChange} min="1" required></input>
                    </div>
                </form>
                <div className="payment-details">
                    <div className="total-payment">


                        <p><span><CurrencyRupeeIcon fontSize="small" /> {tour.rate}</span> x 1 person</p>
                        <p>{tour.rate}</p>
                    </div>
                    <div className="total-payment">
                        <p>Service charge</p>
                        <p>{serviceFee}</p>
                    </div>
                    <div className="total-payment">
                        <p>Total</p>
                        <p>{totalAmount}</p>
                    </div>
                    <p className="book-button" onClick={handleClick}>Book Now</p>
                </div>
            </div>
        </div>
    )
}

export function ThankYou() {
    const navigate = useNavigate()
    return (
        <div className="thankyou">
            <i class="bi bi-check2-circle"></i>
            <p className="cursive-text">Thank You</p>
            <p className="ticket-conform">Your ticket has been conformed</p>
            <p className="home-button" onClick={() => navigate("/")}>Back to home</p>
        </div>
    )
}


