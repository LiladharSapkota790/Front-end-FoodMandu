import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="d-flex align-items-center flex-column justify-content-center ">
        <h1 className="text-danger text-center  p-5">
        
          The page is not available{" "}
        </h1>
        <Link to={"/"} className="btn btn-info">
     
          Go home
        </Link>
      </div>
    </>
  );
}
