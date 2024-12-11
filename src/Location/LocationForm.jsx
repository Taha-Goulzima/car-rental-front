import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarRental } from "../redux/apiCall"; // Import your fetchCarRental action
import { createLocationAsync } from "../redux/apiCall";


function LocaForm({ form, onChange, onSubmit, error }) {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.cars.carsList); // Assuming cars are stored in Redux state
  
  // Fetch car data from backend when the component mounts
  useEffect(() => {
    if (!cars || cars.length === 0) {
      dispatch(fetchCarRental()); // Dispatch action to fetch car data
    }
  }, []);

const handleSubmit = (event) => {
  event.preventDefault();

  dispatch(createLocationAsync(form))
    .unwrap()
    .then(() => {
      alert("Location created successfully!");
      setForm({}); // Reset the form
    })
    .catch((error) => {
      console.error("Error creating location:", error);
      setError("Une erreur s'est produite lors de la création de la location.");
    });
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
              onChange={onChange}
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
              Immatricule: {form.immatricule || "N/A"}
            </li>
            <li className="list-group-item">
              Année Immatriculation: {form.year || "N/A"}
            </li>
            <li className="list-group-item">
              Kilométrage: {form.kilometers || "N/A"}
            </li>
            <li className="list-group-item">
              Tarif Journalier: {form.pricePerDay || "N/A"}
            </li>
          </ul>
          <div className="alert mt-3 text-center" style={{ fontSize: "50px" }}>
            {form.pricePerDay || 0}.<span style={{ fontSize: "25px" }}>00 MAD</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default LocaForm;
