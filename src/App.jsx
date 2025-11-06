import { Toaster } from "react-hot-toast";
import AddNewCategory from "./Category/AddNewCategory";
import Header from "./Header/Header";
import Modal from "./Modal/Modal";
import AddNewProduct from "./Product/AddNewProduct";
import FontWrapper from "./ui/FontWrapper";
import ProductList from "./ProductList/ProductList";
import { DarkModeProvider } from "./Context/DarkModeContext";
import { ProductProvider } from "./Context/ProductContext";
import { CategoryProvider } from "./Context/CategoryContext";

function App() {
  return (
    <CategoryProvider>
      <ProductProvider>
        <DarkModeProvider>
          <FontWrapper>
            <div>
              <Toaster />

              <Modal />
              <div className="bg-secondary-800 min-h-screen">
                {/* <!-- Header section --> */}
                <Header />
                {/* <!-- App Content --> */}
                <div className="container max-w-screen-sm mx-auto ">
                  {/* <!-- Category Section --> */}
                  <AddNewCategory />
                  {/* <!-- Product Section --> */}
                  <AddNewProduct />
                  {/* <!-- Product List Section --> */}
                  <div>
                    <ProductList />
                  </div>

                  <div id="products-list"></div>
                  <div className="h-40"></div>
                </div>
              </div>
            </div>
          </FontWrapper>
        </DarkModeProvider>
      </ProductProvider>
    </CategoryProvider>
  );
}

export default App;
