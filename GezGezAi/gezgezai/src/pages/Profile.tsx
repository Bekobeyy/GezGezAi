import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonInput,
} from "@ionic/react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profil: React.FC = () => {
  const [name, setName] = useState("Ahmet Yılmaz");
  const [email, setEmail] = useState("ahmet@example.com");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Profil fotoğrafı yükleme fonksiyonu
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfilePic(fileReader.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  // Şifre değiştirme fonksiyonu (şimdilik sadece alert veriyor)
  const changePassword = () => {
    alert("Şifre değiştirme işlemi burada yapılacak.");
  };

  // Çıkış yap fonksiyonu
  const logout = () => {
    alert("Çıkış yapıldı.");
  };

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <div className="toolbar-container">
            <Link to="/" className="logo-link">
              <img src="../assets/logo_seffaf.png" alt="GezGezAi Logo" className="logo" />
            </Link>
            <Link to="/geziplani" className="link-text">Gezi Planı</Link>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="profile-container">
          <h1 className="profile-title">Profil Bilgileri</h1>

          {/* Profil Fotoğrafı */}
          <div className="profile-pic-container">
            <img
              src={profilePic || "../assets/default_profile.png"}
              alt="Profil"
              className="profile-pic"
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Kullanıcı Bilgileri */}
          <div className="profile-info">
            <label>Ad Soyad:</label>
            <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} />

            <label>E-Posta:</label>
            <IonInput value={email} readonly />
          </div>

          {/* Şifre Değiştir ve Çıkış Yap Butonları */}
          <IonButton className="profile-button" expand="block" onClick={changePassword}>
            Şifre Değiştir
          </IonButton>
          <IonButton className="logout-button" expand="block" onClick={logout}>
            Çıkış Yap
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profil;
