import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/index.css';
import Header from './Header';
import Footer from './Footer';

export default function Home() {
  let navigate = useNavigate();
  let initData = {
    _id: '',
    name: '',
    city_id: 0,
    location_id: 0,
    city: '',
    country_name: '',
  };
  // location
  let [locations, setLocations] = useState([]);
  let [hideLocation, setHideLocation] = useState(true);

  let [selectLocation, setSelectLocation] = useState({ ...initData });
  // setting meal
  let [meals, setMeals] = useState([]);

  console.log('MEALS', meals);

  // now finding restaurant based on selected location
  let [restaurant_list, setRestaurantList] = useState({
    list: [],
    message: 'no restaurant found',
  });

  // onclick show selected location and city

  // console.log(
  //   "Logging from top" + JSON.stringify(selectLocation));

  const setASelectedLocation = (id) => {
    setSelectLocation(locations[id]);
    setHideLocation(true);
  };

  //show and hide location

  let getMealTypeList = async () => {
    try {
      let url = 'http://localhost:3040/api/get-meal-type-list';
      let response = await axios.get(url);
      let data = response.data;
      console.log('THis is data ' + data);
      setMeals(data.result);
    } catch (error) {
      alert('Server Error');
      console.log(error);
    }
  };

  let getLocationList = async () => {
    try {
      let url = 'http://localhost:3040/api/get-location-list';
      let response = await axios.get(url);
      let data = response.data;
      // console.log("This is Location List " + data);

      setLocations(data.result);
      console.log(data);
    } catch (err) {
      console.log('Error from location list ' + err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let getRestaurantListByLocId = async () => {
    let url =
      'http://localhost:3040/api/get-restaurant-list-by-loc-id/' +
      selectLocation.location_id;
    let response = await axios.get(url);

    let data = response.data;
    // console.log("This log is from getlistbylocbyid" + data);
    setRestaurantList({
      list: data.result,
      message: data.result.length + ' restaurant found',
    });
    // console.log("This si from resbyid" + JSON.stringify(data.result));
  };
  // using useeffect to hold the data

  // only on page load
  useEffect(() => {
    getMealTypeList();
    getLocationList();
  }, []); // on mount

  useEffect(() => {
    if (selectLocation.location_id !== 0) {
      getRestaurantListByLocId();
    }
  }, [selectLocation, getRestaurantListByLocId]);

  return (
    <>
      <section className='homepage-container'>
        <section className='col-12'>
          <header className='container d-flex justify-content-end p-4 d-lg-flex d-none'>
            <Header page={'home'} />
          </header>
        </section>

        <section className='brand-section d-flex justify-content-center'>
          <p
            className='
          m-0 brand bg-white fw-bold fs-3 text-danger d-flex justify-content-center py-4 mb-4'
          >
            ƒ*
          </p>
        </section>

        <section className='row'>
          <div className='col-12 d-flex justify-content-center text-white mt-lg-4'>
            <h2 className='text-center mt-sm-6 fs-lg-4 fw-bold fs-lg-4 fs-2'>
              Find the best restaurants, cafés, and bars
            </h2>
          </div>
        </section>

        <div className='row find-restaurant-location d-flex justify-content-center align-items-center mb-5 py-5'>
          <div className='col-lg-3 col-md-12 col-sm-12 location-input position-relative py-2  ps-5'>
            <input
              type='text'
              className='form-control p-lg-3 mb-lg-0 py-2 set-100 '
              placeholder='Select a location'
              readOnly
              value={selectLocation.name === '' ? '' : `${selectLocation.name}`}
              onClick={() => setHideLocation(false)}
            />
            {hideLocation ? null : (
              <ul className='list-group position-absolute top-100 w-100 z-100 pe-4'>
                {locations.map((location, index) => {
                  return (
                    <li
                      key={location._id}
                      className='list-group-item'
                      aria-current='true'
                      onClick={() => setASelectedLocation(index)}
                    >
                      {location.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className='col-lg-4 col-md-12 col-sm-12 location-input position-relative py-2  ps-5'>
            <div className='col-md-12 restaurant-input  '>
              <input
                type='text'
                className='form-control p-lg-3 p-3 mb-2'
                placeholder={restaurant_list.message}
                onChange={() => {}}
              />
            </div>

            <ul className='list-group position-absolute top-100 w-lg-100 w-sm-90 z-99'>
              {restaurant_list.list.map((restaurant, index) => {
                return (
                  <li
                    key={restaurant._id}
                    className='list-group-item'
                    onClick={() =>
                      navigate('/restaurant-details/' + restaurant._id)
                    }
                  >
                    <img
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50px',
                      }}
                      src={'/images/' + restaurant.image}
                      className='me-2'
                      alt=''
                    />
                    <span>
                      {restaurant.name}, {restaurant.city}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className='quick-searches p-5 m-5 '>
        <div className='container '>
          <h2 className='fs-lg-2 fs-1 fw-bold common-title-color p-0 '>
            Quick Searches
          </h2>
          <p className='mb-5 '>Discover restaurants by type of meal</p>

          <div className='row gap-5 d-flex justify-content-center align-items-center '>
            {meals.map((meal) => {
              return (
                <div
                  key={meal._id}
                  className='my-box-shadow col-lg-3 col-12 d-flex mb-lg-2 p-0 mb-3  ms-lg-0  breakfast-div  '
                  onClick={() =>
                    navigate(`/search/${meal.meal_type}/${meal.name}`)
                  }
                >
                  <div className='px-0 d-flex border border-1'>
                    <img
                      src={'/images/' + meal.image}
                      alt={meal.name}
                      className=''
                    />
                    <div>
                      <p className='h6 fw-bold common-title-color ps-3 pt-3 '>
                        {meal.name}
                      </p>
                      <p className='ps-3'>{meal.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
