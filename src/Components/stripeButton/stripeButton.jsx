import StripeCheckout from 'react-stripe-checkout';


export const StripeCheckoutButton = ({price}) => {
	const priceForStripe = price * 100;
	const publishableKey = import.meta.env.VITE_STRIPE_TOKEN;
	const onToken = () => {
		alert("payment successfull")
	}
	return (
		<StripeCheckout 
			label="Pay Now"
			name="Fashion Store Ltd."
			currency="INR"
			billingAddress
			shippingAddress
			description = {`your total is ₹${price}`}
			amount= {priceForStripe}
			pannelLabel ="Pay Now"
			token={onToken}
			stripeKey = {publishableKey}
			/>
			)	
} 
