import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface UserType {
  id?: number;
  employeeNo?: string;
  section?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  image?: string | null;
  isHired?: string;
  contactNumber?: string;
  createdDate?: string;
  createdTime?: string;
  updatedDate?: string;
  updatedTime?: string;
  // add any other fields your user object has
}

// Define the shape of your context
interface AppContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
  studentNo: string | null;
  setStudentNo: Dispatch<SetStateAction<string | null>>;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  loading: boolean; // 👈 NEW
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface MyComponentProps {
  children: ReactNode;
}

export default function AppProvider({ children }: MyComponentProps) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [studentNo, setStudentNo] = useState(localStorage.getItem('studentNo'));

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // 👈 NEW

  async function getUser() {
    try {
      const res = await fetch('https://hrmbackend.ucc.bsit4c.com/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (!res.ok) {
        setUser(null);
      } else {
        const response = await res.json();
        setUser(response.data);
        console.log(response.data);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false); // 👈 done loading
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false); // no token, nothing to fetch
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        loading,
        setLoading,
        userId,
        setUserId,
        studentNo,
        setStudentNo,
      }}
    >
      {loading ? <></> : children}
    </AppContext.Provider>
  );
}
