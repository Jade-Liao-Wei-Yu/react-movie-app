import { Routes, Route } from "react-router-dom";
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageFavourites from "../pages/PageFavourites";
import PageNotFound from "../pages/PageNotFound";
import PageMovie from "../pages/PageMovie";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/favourites" element={<PageFavourites />} />
            <Route path="/movie/:movieId" element={<PageMovie />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRouter;