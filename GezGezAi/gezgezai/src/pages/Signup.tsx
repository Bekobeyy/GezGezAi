import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
} from "@ionic/react";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  return (
    <IonPage className="signup-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
            <div className="toolbar-container">
              <Link to="/" className="logo-link">
                <img src="../assets/logo_seffaf.png" alt="GezGezAi Logo" className="logo" />
              </Link>
              <Link to="/" className="link-text">Ana Sayfa</Link>
            </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="signup-container">
          <h1 className="signup-title">
            <img src="../assets/logo_seffaf_yazi.png" alt="GezGezAi Logo" className="logo" />
          </h1>
          <IonItem className="signup-input">
            <IonLabel position="fixed">Ad Soyad</IonLabel>
            <IonInput type="text" required />
          </IonItem>
          <IonItem className="signup-input">
            <IonLabel position="fixed">E-posta</IonLabel>
            <IonInput type="email" required />
          </IonItem>
          <IonItem className="signup-input">
            <IonLabel position="fixed">Şifre</IonLabel>
            <IonInput type="password" required />
          </IonItem>
          <IonButton expand="block" className="signup-button">
            KAYIT OL
          </IonButton>
          <p className="signup-text">
            Zaten bir hesabınız var mı? <Link to="/login">Giriş Yapın</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
