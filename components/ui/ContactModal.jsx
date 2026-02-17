"use client"
import { useState, useEffect, useRef } from "react";
import styles from "./ContactModal.module.css";
import ErrorMessage from "./ErrorMessage";

// Déclare le composant ContactModal et récupère les propriétés open, close et photographer
export default function ContactModal({ open, close, photographer }) {
  // ⚡ États pour chaque champ du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Référence de la modale pour le focus trap
  const modalRef = useRef(null);

  // 🔒 Focus trap et navigation clavier
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      "button, input, textarea, select, a[href]"
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab normal
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus automatique sur le premier champ
    firstElement.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // 🔒 Bloquer le scroll du body lorsque la modale est ouverte
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // 🔹 Si la modale n’est pas ouverte, on ne rend rien
  if (!open) return null;

  // ✉️ Fonction pour gérer l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Vérification des champs obligatoires
    if (!firstName || !lastName || !email || !message) {
      setErrorMessage("Tous les champs sont obligatoires !");
      console.error("Un ou plusieurs champs sont vides.");
      return;
    }

    // 2️⃣ Vérification simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Veuillez entrer un email valide.");
      console.error("Email invalide :", email);
      return;
    }

    // 3️⃣ Tout est valide, on réinitialise l'erreur
    setErrorMessage("");

    // 4️⃣ Envoi des données dans la console
    console.log("Données du formulaire :", { firstName, lastName, email, message });

    // 5️⃣ Réinitialisation des champs
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");

    // 6️⃣ Fermeture de la modale
    close();
  };


 	return (
	<div className={styles.superposition} role="presentation">
		<div
			className={styles.modal}
			role="dialog"
			aria-modal="true"
			aria-labelledby="contact-modal-title"
			ref={modalRef}
		>
		<form className={styles.container_formulaire} onSubmit={handleSubmit}>
			<h1 className={styles.title} id="contact-modal-title">
				Contactez-moi <span>{photographer.name}</span>
			</h1>
			{errorMessage && <ErrorMessage message={errorMessage} />}
			<div className={styles.fields}>
				<div>
					<label className={styles.label} htmlFor="first_name">
						Prénom
					</label>
					<input
						className={styles.input}
						type="text"
						name="first_name"
						id="first_name"
						placeholder="Votre Prénom"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
				/>
				</div>

				<div>
					<label className={styles.label} htmlFor="last_name">
						Nom
					</label>
					<input
						className={styles.input}
						type="text"
						name="last_name"
						id="last_name"
						placeholder="Votre Nom"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className={styles.label} htmlFor="email">
						Email
					</label>
					<input
						className={styles.input}
						type="email"
						name="email"
						id="email"
						placeholder="Votre Email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setErrorMessage("");
						}}
						required
					/>
				</div>

				<div>
					<label className={styles.label} htmlFor="your_message">
						Votre message
					</label>
					<textarea
						className={styles.textarea}
						name="your_message"
						id="your_message"
						placeholder="Votre message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					></textarea>
				</div>
			</div>
			<button className={styles.send} type="submit">
				Envoyer
			</button>
		</form>

		<button
			aria-labelledby="Close Contact form"
			className={styles.btn}
			onClick={close}
			aria-label="Fermer le formulaire de contact"
		>
			✖
		</button>
		</div>
	</div>
  );
}
