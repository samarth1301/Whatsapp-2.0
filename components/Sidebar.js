import { HiOutlineDotsVertical, HiOutlineSearch } from "react-icons/hi" 
import { BsChatLeftText } from "react-icons/bs" 
import { Scrollbars } from 'react-custom-scrollbars'; 
 import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";



const Sidebar = () => { 
    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where('users','array-contains',user?.email);
    const [chatsSnapshot]= useCollection(userChatRef);
    
    const searchHandle = (e) => { 
        console.log(e.target.value); 
    } 
    const createChat = () => { 
        const name = prompt("Please enter a email address for the user you wish to start chat with") 
        if (!name) { return null } 
        if (EmailValidator.validate(name) && !chatAlreadyExists(name) && name!==user.email) { 
            // we will add the chat here.
            db.collection('chats').add({
                users:[user.email, name],
            })
        } 
        else if(chatAlreadyExists(name)){
            alert("chat already exists")
        }

        else{
            alert("Invalid E-mail")
        }
    } 

    const chatAlreadyExists= (recipientEmail)=>
       !!chatsSnapshot?.docs.find(
            chat => chat.data().users.find(user=> user === recipientEmail)?.length>0);
    
 
    return ( 
        <div style={{height:"99vh"}} className=" h-screen  bg-white lg:w-1/3 md:w-1/2  w-full px-2"> 
        <Scrollbars 
                autoHide 
                autoHideTimeout={1000} 
                autoHideDuration={200}> 
                    <div className="sticky top-0 z-30 bg-white"> 
                        <div className="flex justify-between items-center h-16"> 
                            <div><img src={user.photoURL} onClick={()=>{auth.signOut()}} className="w-10 h-10 cursor-pointer rounded-full hover:opacity-40" /></div> 
                            <div className="flex justify-evenly items-center"> 
                                <BsChatLeftText className="w-5 h-5 cursor-pointer" /> 
                                <HiOutlineDotsVertical className="w-5 h-5 mx-2 cursor-pointer" /> 
                            </div> 
                        </div> 
                        <div className="flex items-center shadow h-12 justify-center py-2"> 
                            <HiOutlineSearch className="mr-5 text-gray-400" /> 
                            <input placeholder="Search Chat" className="focus:outline-none" onChange={searchHandle} /> 
                        </div> 
                        <button className="text-2xl text-center w-full hover:bg-gray-100 py-2 my-2" onClick={createChat}>Start a new chat</button> 
                    </div> 
                    <div className="flex flex-col py-4"> 
                            {chatsSnapshot?.docs.map(chat=>{
                               
                            return    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                            })}
                    </div> 
 
            </Scrollbars> 
        </div> 
    ) 
} 
 
export default Sidebar