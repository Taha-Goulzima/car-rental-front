import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarRental } from "../redux/apiCall"; // Import your fetchCarRental action
import { createLocationAsync } from "../redux/apiCall";

function LocaForm({ form, onChange, error }) {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.cars.carsList); // Assuming cars are stored in Redux state
  const [selectedCar, setSelectedCar] = useState();
  console.log(selectedCar);

  // Fetch car data from backend when the component mounts
  useEffect(() => {
    if (!cars || cars.length === 0) {
      dispatch(fetchCarRental()); // Dispatch action to fetch car data
    }
  }, []);

  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    const daysDiff = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    return daysDiff * pricePerDay;
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const nom = e.target["name"].value;
    const prenom = e.target["prenom"].value;
    const cin = e.target["cin"].value;
    const phone = e.target["phone"].value;
    const address = e.target["address"].value;
    const startDate = form.startDate;
    const endDatevalue = form.endDate;
    const CarId=selectedCar._id;
    const data ={
      startDate:startDate,
    endDate: endDatevalue,
    carId:CarId,
    name: nom,
    lastName:prenom ,
    cin:cin ,
    phoneNumber:phone ,
    address: address,
    price:calculateTotalPrice(startDate, endDatevalue,selectedCar?.pricePerDay)
    }
    dispatch(createLocationAsync(data));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createLocationAsync(form))
      .unwrap()
      .then(() => {
        alert("Location created successfully!");
      })
      .catch((error) => {
        console.error("Error creating location:", error);
      });
  };

  const handleImmatriculeCarChange = (e) => {
    setSelectedCar(cars.filter((car) => car._id === e.target.value)[0]);
    onChange(e);
  };

  return (
    <div className="container-fluid">
      <div
        className="header1"
        style={{
          width: "85%",
          backgroundColor: "#e7f1fc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="me-3 flex-grow-1 col-3">
            <label htmlFor="start-date" className="form-label">
              Date de départ
            </label>
            <input
              type="date"
              id="start-date"
              className="form-control"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              placeholder="Aujourd'hui"
              max={form.endDate}
            />
          </div>

          <div className="me-3 flex-grow-1 col-3">
            <label htmlFor="end-date" className="form-label">
              Date de fin
            </label>
            <input
              type="date"
              id="end-date"
              className="form-control"
              name="endDate"
              value={form.endDate || ""}
              onChange={onChange}
              placeholder="Demain"
              min={form.startDate}
            />
          </div>

          <div className="flex-grow-1 col-3">
            <label htmlFor="car" className="form-label">
              Voiture
            </label>
            <select
              id="car"
              className="form-select"
              name="immatricule"
              value={form.immatricule}
              onChange={handleImmatriculeCarChange}
            >
              <option value="">Sélectionner une voiture</option>
              {cars && cars.length > 0 ? (
                cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.immatricule}
                  </option>
                ))
              ) : (
                <option disabled>Aucune voiture disponible</option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <main className="col-md-8 mx-auto p-4">
          <form className="p-4 rounded" onSubmit={onSubmit}>
            <div className="row">
              <h5>Infos du client</h5>
              <div className="col-5 mb-3">
                <label htmlFor="name" className="mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Saisir le nom"
                />
              </div>
              <div className="col-5 mb-3">
                <label htmlFor="prenom" className="mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  value={form.prenom}
                  onChange={onChange}
                  placeholder="Saisir le prénom"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 mb-3">
                <label htmlFor="cin" className="mb-2">
                  CIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cin"
                  name="cin"
                  value={form.cin}
                  onChange={onChange}
                  placeholder="Saisir le CIN"
                />
              </div>
              <div className="col-5 mb-3">
                <label htmlFor="phone" className="mb-2">
                  N° Téléphone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Saisir le N° Téléphone"
                />
              </div>
              <div className="col-10 mb-3">
                <label htmlFor="address" className="mb-2">
                  Adresse Postale
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  rows="3"
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  placeholder="Saisir l’adresse postale"
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Créer la Location
            </button>
            {error && (
              <p className="text-danger mt-3" style={{ fontWeight: "600" }}>
                {error}
              </p>
            )}
          </form>
        </main>

        <aside className="col-md-4 bg-light p-3">
          <h2>{form.carName || "Aucune voiture sélectionnée"}</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Immatricule: {selectedCar?.immatricule || "N/A"}
            </li>
            <li className="list-group-item">
              Année Immatriculation: {selectedCar?.year || "N/A"}
            </li>
            <li className="list-group-item">
              Kilométrage: {selectedCar?.kilometers || "N/A"}
            </li>
            <li className="list-group-item">
              Tarif Journalier: {selectedCar?.pricePerDay || "N/A"}
            </li>
          </ul>
          <div className="alert mt-3 text-center" style={{ fontSize: "50px" }}>
            {calculateTotalPrice(
              form.startDate,
              form.endDate,
              selectedCar?.pricePerDay
            ) || 0}
            .<span style={{ fontSize: "25px" }}>00 MAD</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default LocaForm;
