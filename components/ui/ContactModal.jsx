import styles from "./ContactModal.module.css";


export default function ContactModal({open, close, photographer}) {
	if(!open)return null
	return (
		
		<div className={styles.superposition} role="presentation">
			<div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
				<form className={styles.container_formulaire}>
				<h1>Contactez-moi <span>{photographer.name}</span></h1>
				<div className={styles.fields}>
					<h2>
						<label className={styles.label} htmlFor="first_name">Prénom</label>
						<input className={styles.input} type="text" name="first_name" id="first_name"
						placeholder="Votre Prénom"
						aria-labelledby="first_name"></input>
					</h2>
					<h2>
						<label className={styles.label} htmlFor="last_name">Nom</label>
						<input className={styles.input} type="text" name="last_name" id="last_name" placeholder="Votre Nom"
						aria-labelledby="last_name"></input>
					</h2>
					<h2>
						<label className={styles.label} htmlFor="email">Email</label>
						<input className={styles.input} type="email" name="email" id="email" placeholder="Votre Email"
						aria-labelledby="email"></input>
					</h2>
					<h2>
						<label className={styles.label} htmlFor="your_message">Votre message</label>
						<textarea className={styles.textarea} type="text" name="your_message" id="your_message" placeholder="Votre message"
						aria-labelledby="your_message"></textarea>
					</h2>
				</div>
				<button className={styles.send}>Envoyer</button>
			</form>
				<button className={styles.btn} onClick={close}>✖</button>
			</div>
		</div>
	)
}