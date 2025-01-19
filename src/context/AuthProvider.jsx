import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../Supabse/supabse.js'; 

const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    session: null,
    loading: true,
    user: null,
    isAdmin: false,
   
    isHcp: false,
    resetPending: false,
    setResetPending: () => {},
  });

  const setResetPending = (value) => {
    setAuthState((prev) => ({ ...prev, resetPending: value }));
  };

  useEffect(() => {
    if (authState.resetPending) return; // Stop fetching session if resetPending is true

    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setAuthState((prev) => ({ ...prev, loading: false }));
        return;
      }

      if (session) {
        await fetchUserProfile(session.user.id, session);
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {

      if (session) {
        fetchUserProfile(session.user.id, session);
      } else {
        setAuthState((prev) => ({
          session: null,
          loading: false,
          user: null,
          isAdmin: false,
          isHcp: false,
          resetPending: false, 
          setResetPending,
        }));
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [authState.resetPending]);

  async function fetchUserProfile(userId, session = authState.session) {
    if (authState.resetPending) return; // Stop fetching profile if resetPending is true

    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setAuthState((prev) => ({
        ...prev,
        session,
        loading: false,
        user: data,
        isAdmin: data.role === 'admin',
        isHcp: data.role === 'hcp',
        resetPending : false
      }));
    } catch (err) {
      console.error('Unexpected error fetching user profile:', err);
    }
  }

 


  return <AuthContext.Provider value={{ ...authState}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
