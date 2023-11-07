import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function CheckOut() {
  return (
    <>

  <Header />
   
      <div className="d-flex align-items-center flex-column justify-content-center  text-white">
        <h1 className="text-danger text-center  p-5">
        
         Thank you for ordering 
        </h1>
        <Link to={"/"} className="btn btn-info">
     
          Start Again
        </Link>
      </div>

      <Footer />
    </>
  );
}
