import {BrowserRouter, Routes, Route} from "react-router-dom";
import {GlobalStyle} from "./GlobalStyle.tsx";
import {useTheme} from "./themes/ThemeContext.tsx";
import {ThemeProvider} from "styled-components";
import {Dashboard} from "./pages/Dashborard/Dashboard.tsx";
import {Login} from "./pages/login/Login.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {PrivateRoute} from "./PrivateRoute.tsx";

function App() {
    const {theme} = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <GlobalStyle theme={theme}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
