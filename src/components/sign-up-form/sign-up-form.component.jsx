import {useState} from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSumbit = async (event) => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = event.target
        if(password.value !== confirmPassword.value ){
            alert('check passys')
            return;
        }
        try{
            const createdUserWithEmailAndPassword = await createAuthUserWithEmailAndPassword(email.value, password.value);
            createUserDocumentFromAuth(createdUserWithEmailAndPassword.user, {displayName: displayName.value})
        }catch(error){
            console.log(error.message)
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSumbit}>
                <FormInput label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm