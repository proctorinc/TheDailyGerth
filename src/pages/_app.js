import "@styles/globals.css";
import { AuthProvider } from "@context/AuthContext";
import { ThemeProvider, useTheme } from "next-themes";

function MyApp({ Component, pageProps }) {
  const { theme } = useTheme;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
