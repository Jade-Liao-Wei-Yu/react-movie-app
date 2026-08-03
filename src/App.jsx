
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./routers/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
}

export default App;


// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import AppRouter from "./routers/AppRouter";

// function App() {
//     return (
//         <>
//             <Header />
//             <AppRouter />
//             <Footer />
//         </>
//     );
// }

// export default App;