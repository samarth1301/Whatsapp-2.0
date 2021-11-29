import Head from "next/head";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
const Login = () => {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
         <>
             <Head>
                 <title>Login</title>
             </Head>

            <div className="flex flex-col  items-center justify-around p-4 h-screen w-full md:w-1/2 border-2 mx-auto" >
                <img className="w-44 md:w-80 h-44 md:h-80" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png" alt="logo" ></img>
                <button onClick={signIn} className="p-4 bg-green-300 flex justify-around items-center gap-3 hover:bg-green-400 rounded-xl border-2 border-green-700"> <FcGoogle/> Sign in with Google</button>
            </div>  
        </>
    )
}

export default Login
