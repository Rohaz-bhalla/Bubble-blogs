import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header, Footer } from './components/ui';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import './App.css';
import { Client } from "appwrite"; 
import conf from './conf/conf';

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Fix: added useNavigate

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          navigate("/"); // ✅ Will now work
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error in auth service", error);
      })
      .finally(() => setLoading(false));
  }, []);

 const pingAppwrite = async () => {
    const client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    try {
      const res = await client.call("get", "/health/ping");
      console.log("✅ Ping success:", res);
      alert("✅ Ping success! Appwrite is working.");
    } catch (err) {
      console.error("❌ Ping failed:", err);
      alert("❌ Ping failed! Check Appwrite config.");
    }
  };

  
// conditional loading 
//return !Loading ? (agar false hui use yeh vala bracket) : (true hui toh use yeh bracket)    syntax
 

  return !Loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main className="px-4 py-6">
          <button
            onClick={pingAppwrite}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send a Ping
          </button>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
} //used null bcz muje kuch b display nhi krana


export default App
