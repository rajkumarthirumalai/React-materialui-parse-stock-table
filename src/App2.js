import { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import LoginPage from './pages/Adminlogin';
import LoginPage2 from './pages/UserLogin';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import IndividualUser from './pages/IndividualUser';
import SensiBull from './pages/SensiBull';
import SensiBullMain from './pages/Sensibullmain';
import Stylingu from './pages/Stylingu';
import SensileAllData from './pages/SensileAllData';
import SensilbleDataSortedByTime from './pages/SensilbleDataSortedByTime';
import SensilbleSortedbyBank from './pages/sensibleSortedbyBank';
import SensilbleDataSortedBystrangles from './pages/SensilbleDataSortedBystrangles';
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = '123';
// const PARSE_HOST_URL = 'http://localhost:1337/parse';
const PARSE_HOST_URL = 'https://parsesharkfin.hyperbig.com/parse';

const PARSE_MASTER_KEY = '123';
Parse.initialize(PARSE_APPLICATION_ID);
Parse.masterKey =  PARSE_MASTER_KEY;
Parse.serverURL = PARSE_HOST_URL;

// ----------------------------------------------------------------------
export function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('googleUsername'));
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Routes>
            <Route path="/" element={<LoginPage2 />} />
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/sensibullview" element={<SensiBullMain />} />
            <Route path="/view" element={< Stylingu/>} />
            <Route path="/all" element={<SensileAllData/>} />
            <Route
              path="/users/:id"
              element={
                <Protected isSignedIn={isSignedIn}>
                  <IndividualUser />
                </Protected>
              }
            />
            <Route
              path="/strike/:id"
              element={
                <Protected isSignedIn={isSignedIn}>
                  <SensiBull />
                </Protected>
              }
            />
            <Route
              path="/stirkebytime/:time"
              element={
                <Protected isSignedIn={isSignedIn}>
                  <SensilbleDataSortedByTime />
                </Protected>
              }
            />
            <Route
              path="/stirkebytimebank/:time"
              element={
                <Protected isSignedIn={isSignedIn}>
                  <SensilbleSortedbyBank/>
                </Protected>
              }
            />
             <Route
              path="/stirkebystrangles/:time"
              element={
                <Protected isSignedIn={isSignedIn}>
                  <SensilbleDataSortedBystrangles/>
                </Protected>
              }
            />

            <Route
              path="/dashboard"
              element={
                <Protected isSignedIn={isSignedIn}>
                  <DashboardAppPage />
                </Protected>
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
