import { useNavigate } from "react-router-dom";

export function BottomNav() {
    const navigate = useNavigate()
    return (
        <div className='bottom-nav'>
            <div className='bottom-nav-content'>
                <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_-CLUzi6xwPtgIBXgiborc7FtPggC05-3w&usqp=CAU" />
                <p></p>
                <div className='contact'>
                    <img className='contact-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ-WnNJYnTo9KxO4_z8Sqx5oS7MZBD5mCf8Q&usqp=CAU" />
                    <img className='contact-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82dfyoxTmnqg1ODsBDnJ4t3I5X1NhVo8AxQ&usqp=CAU" />
                    <img className='contact-logo' src="data:image/png;base64,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" />
                </div>
            </div>
            <div className='bottom-nav-content'>
                <p className='bottom-title'>Discover</p>
                <p className="bottom-nav-btn" onClick={() => navigate("/dashboard")}>Home</p>
                <p className="bottom-nav-btn" onClick={() => navigate("/tours")}>Tours</p>
            </div>

            <div className='bottom-nav-content'>
                <p className='bottom-title'>Contact</p>
                <p><span>Address:5,Thillainagar,Trichy</span></p>
                <p><span>Email:example@email.com</span></p>
                <p><span>Phone:+91 9876543210</span></p>
            </div>
        </div>
    );
}
