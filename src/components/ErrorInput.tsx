function ErrorInput({ children }: { children: React.ReactNode }) {
	return (
		<>
			<p className="text-sm text-red-500">{children}</p>
		</>
	);
}

export default ErrorInput;
