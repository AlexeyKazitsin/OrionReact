import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import AstronautPage from "./pages/AstronautPage/AstronautPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
//import AstronautsPage from "./pages/AstronautsPage/AstronautsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import FlightConstructor from "./components/FlightConstructor/FlightConstructor";
import FlightPage from "./pages/FlightPage/FlightPage";
import FlightsPage from "./pages/FlightsPage/FlightsPage";
import AstronautEditPage from "./pages/AstronautEditPage/AstronautEditPage";
import AstronautAddPage from "./pages/AstronautAddPage/AstronautAddPage";
import AstronautsList from "./pages/AstronautsPage/AstronautsList/AstronautsList";
import AstronautsTableWrapper from "./pages/AstronautsPage/AstronautsTableWrapper/AstronautsTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const description = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && description.pathname.endsWith("astronauts-list") && <FlightConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/services">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/astronauts-list" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/astronauts-list" element={<AstronautsList />} />

                                    <Route path="/astronauts-table" element={<AstronautsTableWrapper />} />

                                    <Route path="/astronauts/add" element={<AstronautAddPage />} />

                                    <Route path="/astronauts/:id" element={<AstronautPage />} />

                                    <Route path="/astronauts/:id/edit" element={<AstronautEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/flights/:id" element={<FlightPage />} />

                                    <Route path="/flights" element={<FlightsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
