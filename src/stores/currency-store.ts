import { create } from "zustand";
import { z } from "zod";
import { devtools } from "zustand/middleware";
import { Data } from "../types";

function requestParse(item: Data, query: unknown) {
	const CurrencySchema = z.object({
		[item.crypto]: z.object({
			[item.coins]: z.object({
				PRICE: z.string(),
				HIGHDAY: z.string(),
				LOWDAY: z.string(),
				LASTUPDATE: z.string(),
				CHANGEPCTDAY: z.string(),
				IMAGEURL: z.string(),
			}),
		}),
	});
	return CurrencySchema.safeParse(query);
}

type CurrencySchemaType = ReturnType<typeof requestParse>["data"];

type State = {
	detail: CurrencySchemaType | null;
	currency: string;
	crypto: string;
	load: boolean;
};

type Actions = {
	setDetail: (data: Data) => void;
};

const useCurrency = create<State & Actions>()(
	devtools(
		(set) => ({
			load: true,
			detail: null,
			currency: "",
			crypto: "",
			async setDetail(data) {
				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${data.crypto}&tsyms=${data.coins}`;
				try {
					set({ load: false, crypto: "" });
					const query = await fetch(url);
					const result = await query.json();

					const success = requestParse(data, result.DISPLAY);
					set({
						detail: success.success ? success.data : null,
						currency: data.coins,
						crypto: data.crypto,
					});
				} catch (e) {
					console.log(e);
				} finally {
					set({ load: true });
				}
			},
		}),
		{ name: "CurrentStore" }
	)
);

export default useCurrency;
