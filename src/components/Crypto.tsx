import useCurrency from "../stores/currency-store";
import CryptoDetail from "./CryptoDetail";

function CryptoM() {
	const { crypto, detail, currency } = useCurrency();
	const { PRICE, LOWDAY, HIGHDAY, LASTUPDATE, CHANGEPCTDAY, IMAGEURL } =
		detail?.[crypto]?.[currency]!;
	return (
		<>
			<section className="w-full max-w-[600px] flex flex-col gap-4 mt-5 bg-gray-50 rounded p-2 shadow-md">
				<h2 className="text-center font-black text-3xl">Cotización</h2>
				<div className="grid  grid-cols-1 md:grid-cols-[1fr,2fr] gap-4">
					<div>
						<img
							className="max-w-[220px] w-full mx-auto"
							src={`https://www.cryptocompare.com${IMAGEURL}`}
							alt="image-crypto"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<CryptoDetail text="El precio es de" label={PRICE} />
						<CryptoDetail text="Precio mas alto del dia" label={HIGHDAY} />
						<CryptoDetail text="Precio mas bajo del dia" label={LOWDAY} />
						<CryptoDetail
							text="Variación ultimas 24 horas"
							label={CHANGEPCTDAY}
						/>
						<CryptoDetail text="Ultima actualización" label={LASTUPDATE} />
					</div>
				</div>
			</section>
		</>
	);
}

export default CryptoM;
