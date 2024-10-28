import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Currency, Data } from "../types";
import ErrorInput from "./ErrorInput";

type InputProps = {
	data: Currency[];
	register: UseFormRegister<Data>;
	errors: FieldErrors<Data>;
};

export default function Input({ data, register, errors }: InputProps) {
	return (
		<>
			<div className="flex flex-col gap-2">
				<label htmlFor="coins" className="font-bold text-lg">
					Moneda:
				</label>
				<select
					id="coins"
					className="p-2 rounded bg-slate-100"
					{...register("coins", {
						required: "Este campo es requerido",
					})}
				>
					<option value="">--Seleccione--</option>
					{data.map((d) => (
						<option value={d.code} key={d.code}>
							{d.name}
						</option>
					))}
				</select>
				{errors.coins && <ErrorInput>{errors.coins.message}</ErrorInput>}
			</div>
		</>
	);
}
