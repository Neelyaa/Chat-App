import { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Validation from './Validation'


const cookies = new Cookies()

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatar: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true)
    const [errors, setErrors] = useState({})
    const [errorServ, setErrorServ] = useState(null)


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const Valid = () => {
        setErrors(Validation(form))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { username, password, avatar } = form

        const URL = 'http://localhost:5000/auth'

        try {
            const {
                data: { token, userId, hashedPassword, fullName },
            } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                username,
                password,
                fullName: form.fullName,
                avatar,
            })

            cookies.set('token', token)
            cookies.set('username', username)
            cookies.set('fullName', fullName)
            cookies.set('userId', userId)

            if (isSignup) {
                cookies.set('avatar', avatar)
                cookies.set('hashedPassword', hashedPassword)
            }

            window.location.reload()

        } catch (error) {
            if (error.response) {
                setErrorServ(error.response.data.message);
            } else if (error.message) {
                setErrorServ(error.message);
            }
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setErrors('')
        setErrorServ('')
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? "S'inscrire" : 'Se connecter'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <input
                                    name='fullName'
                                    id='fullName'
                                    type='text'
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor='fullName'> Nom </label>
                                {errors && (
                                    <span className='error-message'>
                                        {errors.fullName}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <input
                                name='username'
                                id='username'
                                type='text'
                                onChange={handleChange}
                                required
                                autoComplete='true'
                            />
                            <label htmlFor='username'>Pseudo</label>
                            {errors && (
                                <span className='error-message'>
                                    {errors.username}
                                </span>
                            )}
                        </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <input
                                    name='avatar'
                                    id='avatar'
                                    type='text'
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor='avatar'> Avatar URL </label>
                                {errors && (
                                    <span className='error-message'>
                                        {errors.avatar}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <input
                                name='password'
                                id='password'
                                type='password'
                                onChange={handleChange}
                                autoComplete='true'
                                required
                            />
                            <label htmlFor='password'> Mot de passe </label>
                            {errors && (
                                <span className='error-message'>
                                    {errors.password}
                                </span>
                            )}
                            {errorServ && (
                                <span className='error-message'>
                                    {errorServ}
                                </span>
                            )}
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <input
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    type='password'
                                    onChange={handleChange}
                                    autoComplete='true'
                                    required
                                />
                                <label htmlFor='confirmPassword'>Confirmez le mot de passe</label>
                                {errors && (
                                    <span className='error-message'>
                                        {errors.confirmPassword}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button onClick={Valid}>
                                {isSignup ? 'Inscription' : 'Connexion'}
                            </button>
                        </div>
                    </form>

                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup
                                ? 'Vous avez déjà un compte ?'
                                : "Vous n'avez pas de compte ?"}
                            <span onClick={switchMode}>
                                {isSignup ? ' Connexion' : ' Inscription'}
                            </span>
                        </p>
                    </div>
                </div>

                <div className='wave'>
                    <svg
                        data-name='Layer 1'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 1200 120'
                        preserveAspectRatio='none'
                    >
                        <path
                            d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
                            className='shape-fill'
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Auth
