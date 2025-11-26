import { Header, Footer } from "./components";
import { HomePage, SearchPage } from "./pages";

function App() {
  return (
    <>
      <Header />
      <HomePage />
      {/* <Route path="/" component={HomePage} /> */}
      {/* <Route path="/search" component={SearchPage} /> */}
      <Footer />
    </>
  );
}

export default App;
