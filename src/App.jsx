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
            <div className="bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 min-h-screen transition-colors duration-300">
              <Toaster />
              <Modal />

              {/* Header */}
              <Header />

              {/* Main Content */}
              <div className="container max-w-screen-md mx-auto px-4 py-6 space-y-6">
                <AddNewCategory />
                <AddNewProduct />
                <ProductList />
              </div>
            </div>
          </FontWrapper>
        </DarkModeProvider>
      </ProductProvider>
    </CategoryProvider>
  );
}

export default App;
