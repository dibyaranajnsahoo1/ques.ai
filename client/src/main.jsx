import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
        <Toaster position="top-center" />
             <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
>
                <App />
            </GoogleOAuthProvider>
        </Provider>
    </StrictMode>
);
