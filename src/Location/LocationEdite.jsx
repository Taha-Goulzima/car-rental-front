import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import EditeForm from "./EditeForm";
import axios from "axios";

function LocationEdite({ updateLocation }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const locationData = state?.location || {};

  const [form, setForm] = useState({
    startDate: locationData.startDate || "",
    endDate: locationData.endDate || "",
    name: locationData.name || "",
    prenom: locationData.prenom || "",
    cin: locationData.cin || "",
    phone: locationData.phone || "",
    address: locationData.address || "",
    immatricule: locationData.immatricule || null,
    carName: locationData.carName || null,
    year: locationData.year || null,
    kilometers: locationData.kilometers || null,
    pricePerDay: locationData.pricePerDay || 0,
    etat: locationData.status || "Nouvelle",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/car")
      .then((res) => {
        setData(res.data.carsList || []);
      })
      .catch((err) => {
        console.error("Error fetching cars data:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    if (name === "immatricule") {
      const selectedCar = data.find((car) => car.immatricule === value);
      if (selectedCar) {
        setForm((prevForm) => ({
          ...prevForm,
          carName: selectedCar.name,
          pricePerDay: selectedCar.pricePerDay,
          year: selectedCar.year,
          kilometers: selectedCar.kilometers,
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          carName: "",
          pricePerDay: "",
          year: "",
          kilometers: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "startDate",
      "endDate",
      "immatricule",
      "name",
      "prenom",
      "cin",
      "phone",
      "address",
    ];
    const emptyFields = requiredFields.filter((field) => !form[field]);

    if (emptyFields.length > 0) {
      setError("Tous les champs doivent être rempli");
      return;
    }

    const startDate = new Date(form.startDate);
    const endDate = new Date(form.endDate);
    const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (dayDifference < 1) {
      setError("La date de fin doit être supérieure à la date de départ d'au moins un jour.");
      return;
    }

    const cinRegex = /^[A-Z]{2}\d{4,5}$/;
    if (!cinRegex.test(form.cin)) {
      setError("Le format du CIN est invalide.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Le numéro de téléphone doit contenir exactement 10 chiffres.");
      return;
    }

    setError("");

    // استدعاء دالة التحديث
    updateLocation(form);
    navigate("/location");
  };

  return (
    <MainLayout>
      <div className="container mt-4 text-left">
        <h1 className="mb-4" style={{ fontSize: "40px", fontWeight: "700" }}>
          Editer Location
        </h1>
        <EditeForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </MainLayout>
  );
}

export default LocationEdite;
