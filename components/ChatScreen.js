import { useRouter } from "next/dist/client/router";
import { Scrollbars } from "react-custom-scrollbars"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore";
import { BiUser } from "react-icons/bi";
import { auth, db } from "../firebase"
import getreceipantsEmail from "../Utils/getreceipentEmail";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { CgSmileMouthOpen } from "react-icons/cg";
import { ImMic } from "react-icons/im";
import Message from "./Message";
import { useRef, useState } from "react";
import firebase from "firebase";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
    const users = chat.users;
    const [user] = useAuthState(auth);
    const [reciepentEmailSnapshot] = useCollection(db.collection('users').where('email', '==', getreceipantsEmail(users, user)));

    const Profile = reciepentEmailSnapshot?.docs[0]?.data().photoURL;
    const lastSeen = reciepentEmailSnapshot?.docs[0]?.data()?.lastSeen.toDate();
    const name = reciepentEmailSnapshot?.docs?.[0]?.data()?.name;
    
    const email = getreceipantsEmail(users, user);
    const endOfMessageRef= useRef(null);
    const router = useRouter();
    const [input, setinput] = useState("");
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy("timestamp", "asc")
    );


    const scrollToBottom= ()=>{
        endOfMessageRef.current?.scrollIntoView({
            behavior:"smooth",
            block: "start"
        });
    }

    const showMessages = () => {
        scrollToBottom();
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        }
        else{
            return JSON.parse(messages).map(message=>(
                <Message
                key={message.id}
                user={message.user}
                message={message}
                />
            ))
        }
    }
    
    const sendMessage=(e)=>{
        e.preventDefault();
        setinput("");
        //update the last seen
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },{
                merge:true
            }
        )
        //adding messages into chats

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        });
        scrollToBottom();
    }


    return (
        <div className="w-full h-screen  md:w-5/6 px-4 ">
          <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}>
                <div className=" w-full relative " >
                    <div className="flex items-center justify-between bg-white border-2  border-gray-400 p-2 sticky top-0 z-30" >
                        <div className="flex pt-2 items-center gap-4">

                            {
                                Profile ?
                                    <div className="w-9">
                                        <img src={Profile} className="w-full h-full rounded-full" alt="profile" />
                                    </div> :
                                    <div className="bg-green-400 w-9 h-9 flex justify-center text-black rounded-full p-2">
                                        <BiUser />
                                    </div>
                            }
                            <div>
                                <div className="break-words w-max  " style={{maxWidth: "13rem"}} >
                                     <h1 className="text-lg font-bold  " >{name? name: email}</h1>

                                </div>
                                <div className="text-md flex gap-1  text-gray-500" >
                                    Last Active: 
                                    {
                                    lastSeen?
                                    <TimeAgo datetime={lastSeen} />:
                                    <h4 className="" > Not available</h4>
                                    
                                }
                                </div>
                                
                            </div>
                        </div>
                        <div className="flex gap-3" >
                            <BsThreeDotsVertical />

                            <MdOutlineAttachFile />
                        </div>
                    </div>
                    <div className="   p-4 flex flex-col gap-2 " style={{minHeight: "90vh",backgroundImage: `url("https://www.tekportal.net/wp-content/uploads/2019/01/b-g-3655.jpg")`, backgroundRepeat: "no-repeat", backgroundSize:"cover", backgroundAttachment:"fixed" }} >
                    
                        {showMessages()}
                        <div className="h-12" ref={endOfMessageRef}>

                        </div>
                     
                
                    </div>
                    <form className="sticky bottom-0  bg-gray-300 p-3 px-10 flex justify-between z-30">
                        <div className="flex gap-5 items-center w-full">
                            <CgSmileMouthOpen className="w-6 h-6" />
                            <input value={input} onChange={(e=> setinput(e.target.value))}  className="w-1/2 md:w-full p-4 rounded-md" />
                            <ImMic className="w-6 h-6 rounded-full text-" />
                            <button type="submit" onClick={sendMessage} disabled={!input} className="bg-green-500 font-bold px-4 py-2 rounded-md">Send</button>
                        </div>
                    </form>
                </div>

                </Scrollbars>

           
                </div>
                
    )
}

export default ChatScreen
