import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { TourDetails, TourFeatures, ThankYou } from './TourDetails';
import { Login, Signin } from './Login';
import { ForgetPassword } from "./forgetPassword"
import { VerifyOtp } from './verifyOtp';
import { BottomNav } from './BottomNav';

export default function App() {
  const [tour, setTour] = useState([])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signin />} />
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Home tour={tour} setTour={setTour} /></ProtectedRoute>} />
        <Route path="/tours" element={<ProtectedRoute><TourDetails tour={tour} setTour={setTour} /></ProtectedRoute>} />
        <Route path="/tours/:id" element={<ProtectedRoute><TourFeatures /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
      </Routes>
      {/* <RazorPay /> */}
      <BottomNav />
    </div>
  )
}

// function RazorPay() {
//   const [amount, setAmount] = useState('')
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (amount === '') {
//       alert("please enter amount")
//     }
//     else {
//       var option = {
//         key: "rzp_test_72LMdbUpQCS9g2",
//         key_secret: "CaI56S3AP8UyKOr9vHn9nbki",
//         amount: amount * 100,
//         currency: "INR",
//         name: "Travel Blog",
//         description: "For Booking Ticket",
//         handler: function (response) {
//           alert(response.razorpay_payment_id)
//         },
//         prefill: {
//           name: "Bhagavath",
//           email: "example@gmail.com",
//           contact: "12345678990",
//         },
//         notes: {
//           address: "Razor pay corporate office"
//         },
//         theme: {
//           color: "#3399cc"
//         }

//       }
//       var pay = new window.Razorpay(option)
//       pay.open()
//     }
//   }
//   return (
//     <div>
//       <h2>Razor Pay</h2>
//       <input type="text" placeholder="enteramount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       <button onClick={handleSubmit}>Payment</button>
//     </div>
//   )
// }
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  // const token=false;
  return (
    token ? <section>{children}</section> : <Navigate replace to="/" />
    //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}
function Navbar() {
  const navigate = useNavigate()
  const [navFixed, setNavFixed] = useState(false)
  const logoutFunc = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/")
    }, 1500);
    console.log("logout")
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const scrollThreshold = 70
      if (scrollPosition > scrollThreshold) {
        setNavFixed(true)
      }
      else {
        setNavFixed(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={navFixed ? "navbar fixed-nav" : "navbar"}>
      <nav>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_-CLUzi6xwPtgIBXgiborc7FtPggC05-3w&usqp=CAU" />
        <div className="navbar-content">
          <p onClick={() => navigate("/dashboard")}>Home</p>
          <p onClick={() => navigate("/tours")}>Tours</p>
        </div>
        <div className="navbar-content">
          <p onClick={() => navigate("/")}>Login</p>
          <p onClick={() => navigate("/register")}><span>Register</span></p>
          <p onClick={logoutFunc}>Logout</p>
        </div>
      </nav>
    </div>
  )
}


function Home({ tour, setTour }) {
  return (
    <div>
      <div className="home-container">
        <div className="home">
          <div className="home-content">
            <p className="home-ptag">Traveling opens the door to creating <span>memories</span></p>
            <p className="quotes">"Why do you go away? So that you can come back. So that you can see the place you come fromwith new eyes and extra colors.
              And the people there see you differently,too. Coming back to where you started is not
              the same as never leaving."
            </p>
          </div>
          <div className="home-image">
            <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" />
            <img src="https://images.unsplash.com/photo-1580741186862-c5d0bf2aff33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
          </div>
        </div>
        <Services />
        <FeaturesTours tour={tour} setTour={setTour} />
        <Experience />
      </div>
      <Subscribe />
    </div>
  )
}


function Services() {
  return (
    <div classNaame="service">
      <div className="service-container">
        <div className="serve">
          <p className="italic">What we serve</p>
          <p className="font-bold">We offer our best services</p>
        </div>
        <div className="service-card">
          <img className="service-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyaB4D7h9qE5Ebyl4_gT1cV0LSw3i_Hl4MJg&usqp=CAU" />
          <p className="service-card-title">Calculate Weather</p>
          <p className="service-card-content">Here we calculte the weather for travel </p>
        </div>
        <div className="service-card">
          <img className="service-image" src="data:image/jpeg;base64,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" />
          <p className="service-card-title">Best Tour Guide</p>
          <p className="service-card-content">Happily guiding you through professional expertise!</p>

        </div>
        <div className="service-card">
          <img className="service-image" src="data:image/png;base64,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" />
          <p className="service-card-title">Customisation</p>
          <p className="service-card-content">Customize & Book your tour package</p>

        </div>
      </div>
    </div>
  )
}

function FeaturesTours({ tour, setTour }) {
  // const tour = [{
  //   "img": "https://images.unsplash.com/photo-1580741186862-c5d0bf2aff33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //   "location": "Goa",
  //   "rating": "4.6",
  //   "place": "Goa",
  //   "rate": "Rs.4000"
  // },
  // {
  //   "img": "https://images.unsplash.com/photo-1664996564503-04bdd82c6f41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
  //   "location": "Kerala",
  //   "rating": "4.5",
  //   "place": "Munnar",
  //   "rate": "Rs.2000"
  // },
  // {
  //   "img": "https://media.istockphoto.com/id/916575770/photo/namgyal-tsemo-gompa-in-leh-ladakh-india.webp?b=1&s=170667a&w=0&k=20&c=dERhj6VeNn0KnPP0JxgJE_N0vn4Bn4N4XuiMMrtHo1Y=",
  //   "location": "Kashmir",
  //   "rating": "4.6",
  //   "place": "Ladakh",
  //   "rate": "Rs.7000"
  // },
  // {
  //   "img": "  https://media.istockphoto.com/id/683169832/photo/taj-mahal-agra-uttar-pradesh.webp?b=1&s=170667a&w=0&k=20&c=3soDps879DYjL7V93IAf9Y2cZHSE7OKoO6qN4o5thOQ=",
  //   "location": "Uttar Pradesh",
  //   "rating": "5.0",
  //   "place": "Taj Mahal",
  //   "rate": "Rs.5400"
  // },
  // {
  //   "img": "    https://images.unsplash.com/photo-1580294647332-8a399cd9ed45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60=",
  //   "location": "Karnataka",
  //   "rating": "4.7",
  //   "place": "Mysore Palce",
  //   "rate": "Rs.3500"
  // }
  //   ,
  // {
  //   "img": "  https://media.istockphoto.com/id/1440898762/photo/red-fort-in-delhi-india.webp?b=1&s=170667a&w=0&k=20&c=XgOw1VqrCP1y1dwst9tIBSH323mGF7-ZM_opDWvZWlg=",
  //   "location": "Delhi",
  //   "rating": "4.7",
  //   "place": "Red Fort",
  //   "rate": "Rs.4500"
  // },
  // {
  //   "img": "   https://images.unsplash.com/photo-1597073642928-48c0971f7ded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVkdWNoZXJyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   "location": "TamilNadu",
  //   "rating": "4.6",
  //   "place": "Puducherry",
  //   "rate": "Rs.1000"
  // },
  // {
  //   "img": "  https://images.unsplash.com/photo-1619020933389-e96f49742bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29kYWlrYW5hbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   "location": "TamilNadu",
  //   "rating": "4.6",
  //   "place": "Kodaikanal",
  //   "rate": "Rs.2000"
  // }]
  const getProducts = () => {
    fetch("http://localhost:4010/tours",
      { method: "GET" })
      .then((data) => data.json())
      .then((dts) => setTour(dts))
  }
  useEffect(() => getProducts(), [])

  return (
    <div className="featured-tours">
      <div>
        <p className="cursive"> Explore</p>
        <p className="subtitle">Our featured tours</p>
        <div className='tour-container'>
          {tour.map((tour, index, id) => <ToursList tour={tour} key={index} id={id} />)}
        </div>
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

function Experience() {
  return (
    <div className="experience-container">
      <p className="cursive"> Experience</p>
      <div className="experience">
        <div className="experience-content">

          <p className="subtitle">With our all experience we will serve you</p>
          <p></p>
          <div className="experience-details">
            <div className="experience-list">
              <p className="persons">12k+</p>
              <p>successful Trip</p>
            </div>
            <div className="experience-list">
              <p className="persons">2k+</p>
              <p>Regular Clients</p>
            </div>
            <div className="experience-list">
              <p className="persons">15</p>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
        <div className='experience-image'>
          <img src="https://images.unsplash.com/photo-1512617835784-a92626c0a554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHRyYXZlbGxlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </div>
      </div>

    </div>
  )
}

function Subscribe() {
  return (
    <div className='subscribe'>
      <div className='subscribe-content'>
        <p className='subscribe-ptag'>Subscribe now to get useful travelling Information</p>
        <img src="https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhhcHB5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" />
      </div>
    </div>
  )
}

