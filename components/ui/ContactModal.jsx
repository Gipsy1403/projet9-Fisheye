"use client"
import { useState, useEffect, useRef } from "react";
import styles from "./ContactModal.module.css";
import ErrorMessage from "./ErrorMessage";

// Déclare le composant ContactModal et récupère les propriétés open, close et photographer
export default function ContactModal({ open, close, photographer }) {

// *******************************
// ÉTATS DU FORMULAIRE
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	// État pour afficher les messages d'erreur
	const [errorMessage, setErrorMessage] = useState("");

// *******************************
// RÉFÉRENCE DE LA MODALE
	// Référence pour gérer le focus trap dans la modale
	const modalRef = useRef(null);

// *******************************
// FOCUS TRAP ET NAVIGATION CLAVIER
	// Effet pour gérer le focus trap lorsque la modale est ouverte
	useEffect(() => {
		// Vérification si la modale est ouverte et si la référence existe
		if (!open || !modalRef.current) return;
		// Sélection de tous les éléments focusables dans la modale
		const focusableElements = modalRef.current.querySelectorAll("button, input, textarea, select, a[href]");
		// premier élément focusable
		const firstElement = focusableElements[0];
		// dernier élément focusable
		const lastElement = focusableElements[focusableElements.length - 1]; // dernier élément focusable
		// Fonction pour gérer la navigation clavier avec Tab et Shift+Tab
		const handleKeyDown = (e) => {
			if (e.key === "Tab") {
				if (e.shiftKey) {
					// Shift + Tab : boucle vers le dernier élément si le premier est actif
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					// Tab normal : boucle vers le premier élément si le dernier est actif
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		};
		// Ajout de l'écouteur d'événement pour gérer la navigation clavier
		document.addEventListener("keydown", handleKeyDown);
		// Focus automatique sur le premier champ de la modale
		firstElement.focus();
		// Nettoyage : suppression de l'écouteur lors de la fermeture de la modale
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

// *******************************
// BLOQUER LE SCROLL DU BODY

	// Effet pour bloquer le scroll du body lorsque la modale est ouverte
	useEffect(() => {
		if (!open) return;

		// Interdiction du scroll
		document.body.style.overflow = "hidden";

		// Réactivation du scroll lors de la fermeture
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [open]);

// *******************************
// RENDU CONDITIONNEL

	// Ne rien rendre si la modale n'est pas ouverte
	if (!open) return null;

// *******************************
// GESTION DE L'ENVOI DU FORMULAIRE
	// Fonction pour gérer l'envoi du formulaire
	const handleSubmit = (e) => {
		e.preventDefault(); // Empêche le rechargement de la page
		// Vérification des champs obligatoires
		if (!firstName || !lastName || !email || !message) {
			setErrorMessage("Tous les champs sont obligatoires !");
			console.error("Un ou plusieurs champs sont vides.");
			return;
		}
		// Vérification simple du format de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setErrorMessage("Veuillez entrer un email valide.");
			console.error("Email invalide :", email);
			return;
		}
		// Tout est valide, réinitialisation du message d'erreur
		setErrorMessage("");
		// Affichage des données du formulaire dans la console
		console.log("Données du formulaire :", { firstName, lastName, email, message });
		// Réinitialisation des champs du formulaire
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
