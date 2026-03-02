import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import HomePage from "@/react-app/pages/Home";
import AuthPage from "@/react-app/pages/Auth";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import DashboardPage from "@/react-app/pages/Dashboard";
import LicenseKeyPage from "@/react-app/pages/LicenseKey";
import PricingPage from "@/react-app/pages/Pricing";
import DownloadPage from "@/react-app/pages/Download";
import NetworkPage from "@/react-app/pages/Network";
import ClientAccessPage from "@/react-app/pages/ClientAccess";
import FAQPage from "@/react-app/pages/FAQ";
import ContactPage from "@/react-app/pages/Contact";
import TermsPage from "@/react-app/pages/Terms";
import PrivacyPage from "@/react-app/pages/Privacy";
import EULAPage from "@/react-app/pages/EULA";
import AIChatWidget from "@/react-app/components/AIChatWidget";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/license-key/:id" element={<LicenseKeyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/client-access" element={<ClientAccessPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/eula" element={<EULAPage />} />
        </Routes>
        <AIChatWidget />
      </Router>
    </AuthProvider>
  );
}
