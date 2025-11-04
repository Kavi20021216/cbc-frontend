import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage";
import ProductOverViewPage from "./productOverView";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import HomePageImageSlider from "../../components/homePageImageSlider";
import ReviewPage from "./reviewsPage";
import AboutUsPage from "./aboutUsPage";

export default function ClientWebPage() {
	return (
		<div className="w-full h-screen max-h-screen">
			<Header />
			<div className="w-full h-[calc(100%-100px)] ">
				<Routes path="/">
					<Route
						path="/"
						element={
							<HomePageImageSlider/>
						}
					/>
					<Route
						path="/products"
						element={<ProductsPage/>}
					/>
					<Route
						path="/reviews"
						element={<ReviewPage/>}
					/>
					<Route
						path="/about-us"
						element={<AboutUsPage/>}
					/>
					<Route
						path="/contact-us"
						element={<ReviewPage/>}
					/>
					<Route
						path="/cart"
						element={<CartPage/>}
					/>
                    <Route
                        path="/overview/:productId"
                        element={<ProductOverViewPage />}
                    />
					<Route
						path="/checkout"
						element={<CheckoutPage/>}/>
					<Route
						path="/*"
						element={<h1 className="text-3xl text-center">404 Not Found</h1>}
					/>
				</Routes>
			</div>
		</div>
	);
}
