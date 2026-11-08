import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  // Gece Modu State'i (Local Storage destekli)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Tema değiştiğinde Body arka planını ve Local Storage'ı güncelliyoruz
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
    } else {
      document.body.style.backgroundColor = "#f5f7fa";
      document.body.style.color = "#111827";
    }
  }, [isDarkMode]);

  // Tema renklerini alt bileşenlere geçmek için hazırladığımız obje
  const theme = {
    bgMain: isDarkMode ? "#0f172a" : "#f5f7fa",
    bgCard: isDarkMode ? "#1e293b" : "#ffffff",
    textMain: isDarkMode ? "#f8fafc" : "#111827",
    textMuted: isDarkMode ? "#94a3b8" : "#6b7280",
    borderColor: isDarkMode ? "#334155" : "#e5e7eb",
    isDark: isDarkMode,
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header'a tema ve gece modu kontrol fonksiyonlarını yolluyoruz */}
      <Header
        theme={theme}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main style={{ flex: "1", width: "100%", padding: "20px 1%" }}>
        <Routes>
          {/* Ana Sayfa, Arama ve Sayfalama Rotaları */}
          <Route path="/" element={<HomeScreen theme={theme} />} />
          <Route
            path="/search/:keyword"
            element={<HomeScreen theme={theme} />}
          />
          <Route
            path="/page/:pageNumber"
            element={<HomeScreen theme={theme} />}
          />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen theme={theme} />}
          />
          <Route
            path="/category/:category"
            element={<HomeScreen theme={theme} />}
          />

          {/* Diğer Ekranlar */}
          <Route
            path="/product/:id"
            element={<ProductScreen theme={theme} />}
          />
          <Route path="/cart" element={<CartScreen theme={theme} />} />
          <Route path="/login" element={<LoginScreen theme={theme} />} />
          <Route path="/shipping" element={<ShippingScreen theme={theme} />} />
          <Route path="/payment" element={<PaymentScreen theme={theme} />} />
          <Route
            path="/placeorder"
            element={<PlaceOrderScreen theme={theme} />}
          />
          <Route path="/order/:id" element={<OrderScreen theme={theme} />} />
        </Routes>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: theme.bgCard,
          color: theme.textMuted,
          borderTop: `1px solid ${theme.borderColor}`,
          marginTop: "auto",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "15px",
            fontSize: "14px",
          }}
        >
          <span
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = theme.textMain)}
            onMouseLeave={(e) => (e.target.style.color = theme.textMuted)}
          >
            New Arrivals
          </span>
          <span
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = theme.textMain)}
            onMouseLeave={(e) => (e.target.style.color = theme.textMuted)}
          >
            About Us
          </span>
          <span
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = theme.textMain)}
            onMouseLeave={(e) => (e.target.style.color = theme.textMuted)}
          >
            Contact
          </span>
          <span
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = theme.textMain)}
            onMouseLeave={(e) => (e.target.style.color = theme.textMuted)}
          >
            Privacy Policy
          </span>
        </div>
        <p style={{ margin: 0 }}>
          DevGear &copy; {new Date().getFullYear()} | Professional Hardware
          Solutions
        </p>
      </footer>
    </div>
  );
}

export default App;
