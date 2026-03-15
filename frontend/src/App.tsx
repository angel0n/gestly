import {BrowserRouter, Routes, Route} from "react-router-dom";
import {GlobalStyle} from "./GlobalStyle.tsx";
import {useTheme} from "./themes/ThemeContext.tsx";
import {ThemeProvider} from "styled-components";
import {Dashboard} from "./pages/Dashborard/Dashboard.tsx";
import {Login} from "./pages/login/Login.tsx";

function App() {
    const {theme} = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle theme={theme}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
