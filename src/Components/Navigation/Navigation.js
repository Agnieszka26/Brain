
import React from 'react';
import Logo from '../Logo/Logo'

const Navigation =({onChangeRoute, isSingnedIn}) =>{
    if(isSingnedIn){
            return(
                <div>
                    <nav style ={{display:'flex', justifyContent:'space-between'}}>
                    <Logo />
                    <p onClick={() => onChangeRoute('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                    </nav>
                </div>
            );
          
    }else{
            return(
                <div>
                    <nav style ={{display:'flex', justifyContent:'space-between'}}>
                        <Logo />
                        <p onClick={() => onChangeRoute('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                        <p onClick={() => onChangeRoute('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                    </nav>
            
                </div>
            );
        }
    
}


export default Navigation;