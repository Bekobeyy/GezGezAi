import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonToolbar, IonToast } from "@ionic/react";
import { Link } from "react-router-dom";
import "./GeziPlani.css";
import countriesData from "../data/ulkeler_tr.json"; 
import citiesData from "../data/sehirler_tr.json"; 

type Country = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
  country_id: number;
};

const GeziPlani: React.FC = () => {
  const [today, setToday] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    const now = new Date();
    const localToday = now.toISOString().split("T")[0];
    setToday(localToday);
    console.log("Seçili Ülke:", selectedCountry);
    console.log("Mevcut Şehirler:", filteredCities);
  }, [selectedCountry, filteredCities]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value < today) {
      setToastMessage("Başlangıç tarihi bugünden önce olamaz!");
      setShowToast(true);
      return;
    }
    setStartDate(e.target.value);
    setEndDate("");
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value <= startDate) {
      setToastMessage("Bitiş tarihi, başlangıç tarihinden büyük olmalıdır!");
      setShowToast(true);
      return;
    }
    setEndDate(e.target.value);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setFilteredCities(citiesData.filter((city) => city.country_id === country.id));
    setSearchCountry("");
    setSearchCity("");
    setSelectedCities([]);
    setShowCountryDropdown(false);
  };

  const handleCitySelect = (city: City) => {
    if (!selectedCities.some((selected) => selected.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleCityRemove = (cityId: number) => {
    setSelectedCities(selectedCities.filter((city) => city.id !== cityId));
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

          {/* Tarih Seçimi */}
          <div className="date-picker-container">
            <label>Başlangıç Tarihi:</label>
            <input type="date" value={startDate} min={today} onChange={handleStartDateChange} />
          </div>
          <div className="date-picker-container">
            <label>Bitiş Tarihi:</label>
            <input type="date" value={endDate} min={startDate} onChange={handleEndDateChange} />
          </div>

           {/* Ülke Seçimi */}
           <div className="select-container">
            <label>Ülke Seç: </label>
            {selectedCountry && <p className="selected-country">{selectedCountry.name}</p>}
            <input
              type="text"
              placeholder="Ülke Ara..."
              value={searchCountry}
              onFocus={() => setShowCountryDropdown(true)}
              onBlur={() => setTimeout(() => setShowCountryDropdown(false), 100)}
              onChange={(e) => setSearchCountry(e.target.value)}
            />
            <div className={`dropdown-list ${showCountryDropdown ? "show" : ""}`}>
              {countriesData
                .filter((country) => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
                .map((country) => (
                  <div key={country.id} onClick={() => handleCountrySelect(country)}>
                    {country.name}
                  </div>
                ))}
            </div>
          </div>

          {/* Şehir Seçimi */}
          {selectedCountry && (
            <div className="select-container">
              <label>Şehir Seç: </label>
              <input
                type="text"
                placeholder="Şehir Ara..."
                value={searchCity}
                onFocus={() => setShowCityDropdown(true)}
                onBlur={() => setTimeout(() => setShowCityDropdown(false), 100)}
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <div className={`dropdown-list ${showCityDropdown ? "show" : ""}`}>
                {filteredCities
                  .filter((city) => city.name.toLowerCase().includes(searchCity.toLowerCase()) &&
                  !selectedCities.some((selected) => selected.id === city.id) // Daha önce seçilen şehirleri hariç tut
                  )
                  .map((city) => (
                    <div key={city.id} onClick={() => handleCitySelect(city)}>
                      {city.name}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Seçili Şehirler */}
          <div className="selected-cities">
            {selectedCities.map((city) => (
              <div key={city.id} className="city-badge">
                {city.name}
                <button onClick={() => handleCityRemove(city.id)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <IonToast isOpen={showToast} message={toastMessage} duration={2000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default GeziPlani;
