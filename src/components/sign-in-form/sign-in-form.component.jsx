import {useState} from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async ()=> {
        const response = await signInWithGooglePopup();
        const {user} = response;
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSumbit = async (event) => {
        event.preventDefault();
        const {email, password} = event.target
        try{
            const reponse = await signInAuthUserWithEmailAndPassword(email, password)
        }catch(error){
            alert("Trouble Finding That User")
            console.log(error)
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSumbit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password}/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle} style={{
                        padding: '0'
                    }}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm