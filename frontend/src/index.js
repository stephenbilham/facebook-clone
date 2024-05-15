import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
