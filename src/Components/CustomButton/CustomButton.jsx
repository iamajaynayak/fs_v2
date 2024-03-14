import './custombutton.css';

export const CustomButton = ({children, isGoogleSignedIn , inverted , ...buttonprops}) => (
	
	<button className={`${inverted ? 'inverted' : '' }
	 ${isGoogleSignedIn ? 'google-signin' : '' } 
	 custombutton `} {...buttonprops}>
	{
		children
	}
	</button>
	)

