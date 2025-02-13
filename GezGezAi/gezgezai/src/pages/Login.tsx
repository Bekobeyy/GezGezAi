import React, { useState } from "react";
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
  IonToast,
} from "@ionic/react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";

const Login: React.FC = () => {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Giriş başarısız.");
      }

      localStorage.setItem("token", data.token);
      setToastMessage("Giriş başarılı!");
      setShowToast(true);
      setTimeout(() => history.push("/geziplani"), 1000); // Anasayfaya yönlendir
    } catch (error: any) {
      setToastMessage(error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage className="login-page">
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
        <div className="login-container">
        <h1 className="login-title">
            <img src="../assets/logo_seffaf_yazi.png" alt="GezGezAi Logo" className="logo" />
          </h1>
            <IonItem className="login-input">
              <IonLabel position="fixed">E-posta</IonLabel>
              <IonInput
                type="email"
                required
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem className="login-input">
              <IonLabel position="fixed">Şifre</IonLabel>
              <IonInput
                type="password"
                required
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

          <IonButton expand="block" className="login-button" onClick={handleLogin}>
            GİRİŞ YAP
          </IonButton>
          <p className="signup-text">
            Hesabınız yok mu? <Link to="/signup">Kayıt Olun</Link>
          </p>
        </div>
        <IonToast isOpen={showToast} message={toastMessage} duration={2000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
