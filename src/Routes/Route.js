import {Route, Routes} from 'react-router-dom';
import CategoryDetails from '../CategoryPage';
import Product from '../ProductPage';
import QuantityChange from '../QuantityToggle';
import TopNav from '../TopNavigtion/Navigation';
import EmbedCheckout from '../EmbedCheckout';
import Login from '../Login';
import SignUp from '../SignUp';
import Logout from '../Logout';
import SearchItems from '../TopNavigtion/SearchedItems';
function PageRoute(){
    return(
        <>
        <Routes>
            <Route path="category/:cat_id" element={<CategoryDetails />} />
            <Route path="product/:product_id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/checkout" element={<EmbedCheckout />} />
            <Route path="/search" element={<SearchItems />} />
            <Route path="/quantity-toggle" element={<QuantityChange />} />
        </Routes></>
    )
}

export default PageRoute;