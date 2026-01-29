import styles from "./Modal.module.css"

export default function Modal({open, close, children}) {
	if(!open)return null
	return (
		
		<div className={styles.superposition} role="presentation">
			<div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
				{children}
				<button className={styles.btn} onClick={close}>✖</button>
			</div>
		</div>
	)
}