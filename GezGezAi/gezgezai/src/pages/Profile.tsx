import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Profile.css";
import { fetchWithAuth } from "../utils/api";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchWithAuth("/user/profile");
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getUserProfile();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {error && <p>{error}</p>}
        {user ? (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Kredi: {user.credits}</p>
          </div>
        ) : (
          <p>Yükleniyor...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
