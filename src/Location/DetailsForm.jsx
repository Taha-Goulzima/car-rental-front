import React from "react";
import { Link } from "react-router-dom";

const DetailsForm = ({ location, onDelete }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-left">
        Détails Location: {location?.name} {location?.prenom}
      </h1>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-success me-2">Démarrer la location</button>
          <Link
            to="/EditLocation"
            state={{ location }}
            className="btn btn-warning me-2"
          >
            Editer
          </Link>
          <button className="btn btn-danger me-2" onClick={onDelete}>
            Supprimer
          </button>
        </div>

        <div className="row">
          <div className="col-md-4">
            <h6 className="fw-bold">Voiture:</h6>
            <p>{location?.carName}</p>
            <h6 className="fw-bold">Immatricule:</h6>
            <p>{location?.immatricule}</p>
            <h6 className="fw-bold">Année Immatriculation:</h6>
            <p>{location?.year}</p>
            <h6 className="fw-bold">Kilométrage:</h6>
            <p>{location?.kilometers || location?.kilometrage} KM</p>
            <h6 className="fw-bold">Tarif Journalier:</h6>
            <p>{location?.pricePerDay} MAD/Jour</p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold">Nom & Prénom:</h6>
            <p>
              {location?.name} {location?.prenom}
            </p>
            <h6 className="fw-bold">CIN:</h6>
            <p>{location?.cin}</p>
            <h6 className="fw-bold">N° Téléphone:</h6>
            <p>{location?.phone}</p>
            <h6 className="fw-bold">Adresse Postale:</h6>
            <p>{location?.address}</p>
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-between mb-4">
              <button className="btn btn-primary" style={{ borderRadius: "20px" }}>
                Nouvelle
              </button>
            </div>

            <div className="row mb-4">
              <div className="col-12 mb-2">
                <h6 className="fw-bold">Date Début:</h6>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={location?.startDate || "2024-10-01"}
                  readOnly
                />
              </div>
              <div className="col-12">
                <h6 className="fw-bold">Date Fin:</h6>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={location?.endDate || "2024-10-10"}
                  readOnly
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="fw-bold">{location?.priceTotal || "1500.00"} MAD</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
