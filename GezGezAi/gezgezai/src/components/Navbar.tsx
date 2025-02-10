import React from "react";
import { IonToolbar, IonTitle, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

const Navbar: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token'ı kaldır
    history.push("/login"); // Login sayfasına yönlendir
  };

  return (
    <IonToolbar>
      <IonTitle>GezGezAi</IonTitle>
      {localStorage.getItem("token") && (
        <IonButton onClick={handleLogout} slot="end" color="danger">
          Çıkış Yap
        </IonButton>
      )}
    </IonToolbar>
  );
};

export default Navbar;
