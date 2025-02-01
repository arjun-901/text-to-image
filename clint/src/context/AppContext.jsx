import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create a new context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    // State variables
    const [user, setUser] = useState(() => {
        // Initialize user from localStorage if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [showLogin, setShowLogin] = useState(false); // This is the correct name
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);

    // Backend URL from environment variables
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate()

    // Load user data when component mounts or token changes
    useEffect(() => {
        if (token) {
            loadUserData();
        }
    }, [token]);

    // Save user data to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const loadUserData = async () => {
        try {
            const { data } = await axios.get(
                backendurl + '/api/user/credits',
                { headers: { token } }
            );

            if (data.success) {
                setCredit(data.credits);
                setUser(prevUser => ({
                    ...prevUser,
                    ...data.user,
                    credits: data.credits
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const generateImage = async (prompt) => {
        try {
            if (!token) {
                toast.error('Please login first');
                setShowLogin(true);
                return null;
            }

            const { data } = await axios.post(
                backendurl + '/api/image/generate-image', 
                { prompt }, 
                { headers: { token } }
            );

            if (data.success) {
                await loadUserData(); // Reload user data after generating image
                return data.resultImage;
            } else {
                toast.error(data.message);
                if (data.needsCredits) {
                    navigate('/credit');
                    return null;
                }
                await loadUserData(); // Reload user data even on failure
                return null;
            }
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    }

    const logout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('')
        setUser(null)
        setCredit(false)
    }

    // Context value to be provided
    const value = {
        user,
        setUser,
        showLogin, // Consistent naming convention
        setShowLogin,
        backendurl,
        token,
        setToken,
        credit,
        setCredit,
        logout,
        generateImage,
        loadUserData // Export this function if needed elsewhere
    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Export the context provider component
export default AppContextProvider;
