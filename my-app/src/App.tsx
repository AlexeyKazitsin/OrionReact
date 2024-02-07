import "./styles/main.sass"
import "./styles/reset.sass"
import { useState } from 'react'
import Header from "./components/Header/Header";
import {Astronaut} from "./utils/types";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import AstronautPage from "./pages/AstronautPage/AstronautPage";
import AstronautsList from "./pages/AstronautsList/AstronautsList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {

    const [selectedAstronaut, setSelectedAstronaut] = useState<Astronaut | undefined>(undefined)

    return (
        <BrowserRouter basename="/orion">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedAstronaut={selectedAstronaut} setSelectedAstronaut={setSelectedAstronaut}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/astronauts" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/astronauts" element={<AstronautsList />} />

                            <Route path="/astronauts/:id" element={<AstronautPage selectedAstronaut={selectedAstronaut} setSelectedAstronaut={setSelectedAstronaut} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
