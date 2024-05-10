function App() {
	const get = async () => {
		const response = await fetch("http://localhost:8000");
		console.log(response);
	};

	get();

	return (
		<div>
			welcome to frontend
			<div className="all_friends_icon"></div>
		</div>
	);
}

export default App;
