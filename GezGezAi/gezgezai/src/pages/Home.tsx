import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import "./Home.css";

const isAuthenticated = !!localStorage.getItem("token");

const Home: React.FC = () => {
  
  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <div className="toolbar-container">
            <Link to="/" className="logo-link">
              <img src="../assets/logo_seffaf.png" alt="GezGezAi Logo" className="logo" />
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/geziplani" className="link-text">Gezi Planı</Link>
                <Link to="/profile" className="link-text">Profilim</Link>
                <button className="link-text" onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>Çıkış Yap</button>
              </>
            ) : (
              <Link to="/login" className="link-text">Giriş Yap</Link>
            )}
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="home-container">
          <h1 className="home-title">GezGezAi ile Uygun Fiyatlı Gezi Planlayın!</h1>
          <p className="home-text">
            GezGezAi, düşük bütçeyle en iyi seyahat deneyimini yaşamanız için tasarlandı. 
            Sadece birkaç tıklama ile gitmek istediğiniz şehirleri seçin ve 
            size özel oluşturulmuş en uygun fiyatlı, en verimli gezi planını keşfedin.
          </p>
          <p className="home-text">
            Doğal ve kültürel noktaları, restoranları ve konaklama yerlerini tek bir yerde görün.
            Zamandan ve bütçeden tasarruf edin!
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
