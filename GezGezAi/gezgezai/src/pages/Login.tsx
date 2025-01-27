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
import "./Login.css";

const Login: React.FC = () => {
  return (
    <IonPage className="login-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonTitle>
            <img src="../assets/logo_seffaf.png" alt="GezGezAi Logo" className="logo" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="login-container">
        <h1 className="login-title">
            <img src="../assets/logo_seffaf_yazi.png" alt="GezGezAi Logo" className="logo" />
          </h1>
          <IonItem className="login-input">
            <IonLabel position="floating">E-posta</IonLabel>
            <IonInput type="email" required />
          </IonItem>
          <IonItem className="login-input">
            <IonLabel position="floating">Şifre</IonLabel>
            <IonInput type="password" required />
          </IonItem>
          <IonButton expand="block" className="login-button">
            GİRİŞ YAP
          </IonButton>
          <p className="signup-text">
            Hesabınız yok mu? <a href="#signup">Kayıt Olun</a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
