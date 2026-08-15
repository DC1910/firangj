import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { WishlistProvider } from "@/context/WishlistContext";
import { RequestProvider } from "@/context/RequestContext";
import { ScrollToTop } from "@/components/common/ScrollToTop";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";

import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import ProductDetail from "@/pages/ProductDetail";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Wishlist from "@/pages/Wishlist";
import RentalRequest from "@/pages/RentalRequest";

import Dashboard from "@/pages/admin/Dashboard";
import AdminProps from "@/pages/admin/AdminProps";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminRentalRequests from "@/pages/admin/AdminRentalRequests";
import AdminCalendar from "@/pages/admin/AdminCalendar";
import AdminCustomers from "@/pages/admin/AdminCustomers";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminSettings from "@/pages/admin/AdminSettings";

function App() {
  return (
    <div className="App">
      <WishlistProvider>
        <RequestProvider>
          <BrowserRouter>
            <ScrollToTop />
          <Routes>
            {/* Customer-facing */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/rental-request" element={<RentalRequest />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="props" element={<AdminProps />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="rental-requests" element={<AdminRentalRequests />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" />
        </BrowserRouter>
        </RequestProvider>
      </WishlistProvider>
    </div>
  );
}

export default App;
