import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonToolbar, IonToast } from "@ionic/react";
import { Link } from "react-router-dom";
import "./GeziPlani.css";
import countriesData from "../data/ulkeler_tr.json"; // Ülke verilerini içe aktarın
import citiesData from "../data/sehirler_tr.json"; // Şehirler

const GeziPlani: React.FC = () => {
  const [today, setToday] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    const now = new Date();
    const localToday = now.toISOString().split("T")[0];
    setToday(localToday);
  }, []);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value < today) {
      setToastMessage("Başlangıç tarihi bugünden önce olamaz!");
      setShowToast(true);
      return;
    }
    setStartDate(e.target.value);
    setEndDate(""); // Başlangıç tarihi değişirse bitiş tarihini sıfırla
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value <= startDate) {
      setToastMessage("Bitiş tarihi, başlangıç tarihinden büyük olmalıdır!");
      setShowToast(true);
      return;
    }
    setEndDate(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = e.target.value;
    setSelectedCountry(selectedCountryId);
    setFilteredCities(citiesData.filter(city => city.country_id === Number(selectedCountryId)));
  };

  return (
    <IonPage className="gezi-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <div className="toolbar-container">
            <Link to="/" className="logo-link">
              <img src="../assets/logo_seffaf.png" alt="GezGezAi Logo" className="logo" />
            </Link>
            <Link to="/profile" className="link-text">Profilim</Link>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="gezi-container">
          <h1 className="gezi-title">Gezi Planınızı Oluşturun</h1>
          <div className="date-picker-container">
            <label>Başlangıç Tarihi:</label>
            <input type="date" value={startDate} min={today} onChange={handleStartDateChange} />
          </div>
          <div className="date-picker-container">
            <label>Bitiş Tarihi:</label>
            <input type="date" value={endDate} min={startDate} onChange={handleEndDateChange} />
          </div>
          <div className="select-container">
            <label>Ülke Seç:</label>
            <input type="text" placeholder="Ülke Ara..." value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} />
            <select onChange={handleCountryChange}>
              <option value="">Ülke Seçiniz</option>
              {countriesData.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase())).map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </div>
          {selectedCountry && (
            <div className="select-container">
              <label>Şehir Seç:</label>
              <input type="text" placeholder="Şehir Ara..." value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
              <select>
                <option value="">Şehir Seçiniz</option>
                {filteredCities.filter(city => city.name.toLowerCase().includes(searchCity.toLowerCase())).map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <IonToast isOpen={showToast} message={toastMessage} duration={2000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default GeziPlani;
