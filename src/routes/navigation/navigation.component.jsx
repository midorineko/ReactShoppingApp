import {Outlet, Link} from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss'

const Navigation = () => {
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='link-container'>
                    <Link className='nav-links-container' to='/shop'>
                        shop
                    </Link>
                </div>
            </div>
            <Outlet/>
        </>
    )
}
export default Navigation;