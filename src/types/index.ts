export type Currency = {
	code: string;
	name: string;
};

export type PickerCurrency = {
	CoinInfo: {
		Id: string;
		FullName: string;
		Internal: string;
	};
};

export type Data = {
	coins: string;
	crypto: string;
};
