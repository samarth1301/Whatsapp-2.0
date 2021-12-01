import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/server/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiUser } from "react-icons/bi";
import { auth, db } from "../firebase";
import getreceipantsEmail from "../Utils/getreceipentEmail";

const Chat = ({id, users}) => {
    const [user]= useAuthState(auth);
     const router = useRouter();
    const [reciepentEmailSnapshot]= useCollection(db.collection('users').where('email','==',getreceipantsEmail(users,user)));
    const name = reciepentEmailSnapshot?.docs?.[0]?.data()?.name;
    
    const email = getreceipantsEmail(users, user);
    const Profile=  reciepentEmailSnapshot?.docs[0]?.data().photoURL;

    const enterChat=()=>{
        router.push(`/chat/${id}`)
    };

    return (
        <div onClick={enterChat} className="flex items-center gap-5  border-2 p-4 border-grey-400 cursor-pointer hover:bg-gray-100 ">
            {/* <img src="" alt="profile"/> */}
           
               {
                   Profile?
                   <div className="w-9">
                       <img src={Profile} className="w-full h-full rounded-full" alt="profile"/>
                   </div>:
                   <div className="bg-green-400 text-black rounded-full p-2">
                       <BiUser  />
                       </div>
               } 
           <div className="w-full break-words" style={{maxWidth:"10rem"}}>
            <h1>{name? name: email}</h1>

           </div>
        </div>
    )
}

export default Chat;



