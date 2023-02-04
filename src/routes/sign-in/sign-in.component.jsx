import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
    const logGoogleUser = async ()=> {
        const response = await signInWithGooglePopup();
        const {user} = response;
        console.log(user)
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>signin page</h1>
            <button onClick={logGoogleUser}>Sign In With Google PopUp</button>
            <SignUpForm />
        </div>
    )
}
export default SignIn