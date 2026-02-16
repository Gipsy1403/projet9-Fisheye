export default function ErrorMessage({ message }) {
	return (
	<div style={{
		padding: "1rem",
		margin: "4rem 0",
		border: "1px solid #ad0000",
		borderRadius: "5px",
		backgroundColor: "#fff5f5",
		color: "#ad0000",
		fontSize:"24px",
		textAlign: "center",
	}}>
		{message}
	</div>
	)
}
