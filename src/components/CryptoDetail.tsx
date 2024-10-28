type CryptoDetailProp = {
	text: string;
	label: string;
};
function CryptoDetail({ text, label }: CryptoDetailProp) {
	return (
		<>
			<div className="flex gap-2 items-center text-lg">
				<p>{text}:</p>
				<span className="font-bold">{label}</span>
			</div>
		</>
	);
}

export default CryptoDetail;
