import { useForm, SubmitHandler } from "react-hook-form";
import useCurrency from "./stores/currency-store";
import { useEffect, useState } from "react";
import type { Data, PickerCurrency } from "./types";
import Input from "./components/Input";
import { currencies } from "./data/coins";
import ErrorInput from "./components/ErrorInput";
import Spinner from "./components/Spinner";
import CryptoM from "./components/Crypto";

function App() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Data>();
	const [cryptos, setCryptos] = useState<PickerCurrency[]>([]);
	const { setDetail, crypto, load } = useCurrency();

	useEffect(() => {
		async function getCryptos() {
			const url =
				"https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD";
			const fetching = await fetch(url);
			const result = await fetching.json();
			setCryptos(result.Data);
		}
		getCryptos();
	}, []);

	const submit: SubmitHandler<Data> = (data) => {
		setDetail(data);
	};

	return (
		<>
			<main className="w-11/12 max-w-6xl mx-auto h-dvh flex justify-center items-center flex-col gap-6">
				<h2 className="font-bold text-5xl">
					Cotizador de <br />
					<span className="text-emerald-500">Cryptomonedas</span>
				</h2>
				<form
					className="flex flex-col gap-4 w-full max-w-xl mx-auto p-2 rounded shadow-sm"
					onSubmit={handleSubmit(submit)}
				>
					<Input data={currencies} register={register} errors={errors} />
					<div className="flex flex-col gap-2">
						<label htmlFor="cryptos" className="font-bold text-lg">
							Cryptomonedas:
						</label>
						<select
							id="cryptos"
							className="p-2 rounded bg-slate-100"
							{...register("crypto", {
								required: "Este campo es requerido.",
							})}
						>
							<option value="">--Seleccione--</option>
							{cryptos.map((c) => (
								<option value={c.CoinInfo.Internal} key={c.CoinInfo.Id}>
									{c.CoinInfo.FullName}
								</option>
							))}
						</select>
						{errors.crypto && <ErrorInput>{errors.crypto.message}</ErrorInput>}
					</div>
					<input
						type="submit"
						value="Cotizar"
						className="w-full bg-emerald-400 text-white font-bold uppercase p-2 hover:bg-emerald-600 cursor-pointer"
					/>
				</form>
				{crypto && <CryptoM />}
				{!load && <Spinner />}
			</main>
		</>
	);
}

export default App;
