import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Notifications from './Pages/Notifications/Notifications';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Components/Profile/EditProfile';
import Create from './Pages/Create/Create';
import MyEvents from './Pages/MyEvents/MyEvents';
import EventDetails from './Pages/MyEvents/EventDetails';
import History from './Pages/History/History';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/Common/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`app ${isAuthPage ? 'auth-page' : ''}`}>
      {!isAuthPage && <Header />}
      <main className={`main-content ${isAuthPage ? 'auth-content' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/edit" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          } />
          <Route path="/my-events" element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          } />
          <Route path="/events/:id" element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
