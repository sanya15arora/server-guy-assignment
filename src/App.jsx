import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ItemPage from "./pages/ItemPage"
import Login from "./pages/Login"
import theme from "./theme";
import UserPage from "./pages/UserPage";


function App() {
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
