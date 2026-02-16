"use client"
import { useState } from "react";
import styles from "./ContactModal.module.css";
import ErrorMessage from "./ErrorMessage";

// Déclare le composant ContactModal et récupère les propriétés open, close et photographer
export default function ContactModal({ open, close, photographer }) {
	// Initialise un état pour stocker le prénom saisi dans le formulaire
	const [firstName, setFirstName] = useState("");
	// Initialise un état pour stocker le nom saisi dans le formulaire
	const [lastName, setLastName] = useState("");
	// Initialise un état pour stocker l’email saisi dans le formulaire
	const [email, setEmail] = useState("");
	// Initialise un état pour stocker le message saisi dans le formulaire
	const [message, setMessage] = useState("");
	// Initialise un état pour stocker le message d'erreur vu par l'utilisateur
	const [errorMessage, setErrorMessage] = useState(""); 

	// Retourne null si la modale n’est pas ouverte afin de ne rien afficher
	if (!open) return null;
	// Fonction pour envoyer le formulaire dans la console
	const handleSubmit = (e) => {
		e.preventDefault();
		// Vérifications simples
		if (!firstName || !lastName || !email || !message) {
			setErrorMessage("Tous les champs sont obligatoires !");
			console.error("ContactModal : un ou plusieurs champs sont vides.");
		return;
		}
		// Vérifie le format de l'email simple (peut être amélioré)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setErrorMessage("Veuillez entrer un email valide.");
			console.error("ContactModal : email invalide ->", email);
		return;
		}
		// Si tout est ok, réinitialise l'erreur
		setErrorMessage("");
		// Envoi des données dans la console
		console.log("Prénom :", firstName);
		console.log("Nom :", lastName);
		console.log("Email :", email);
		console.log("Message :", message);
		// Réinitialisation des champs
		setFirstName("");
		setLastName("");
		setEmail("");
		setMessage("");
	};


 	return (
	<div className={styles.superposition} role="presentation">
		<div
			className={styles.modal}
			role="dialog"
			aria-modal="true"
			aria-labelledby="contact-modal-title"
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
