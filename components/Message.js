import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"

const Message = ({user, message}) => {
    const [userlog]= useAuthState(auth);
    
    return (
        <div className={` ${userlog.email!==user? "self-start bg-white": "self-end bg-green-400"} flex flex-col w-max max-w-xs break-words rounded-xl px-4 py-2 `}>
           {message.message}
           <div className="text-sm text-gray-500 self-end">
           {message.timestamp?moment(message.timestamp).format("LT"):"..."}

           </div>
        </div>
    )
}

export default Message
