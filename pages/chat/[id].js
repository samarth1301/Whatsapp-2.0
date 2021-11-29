import Head from "next/head"
import { useAuthState } from "react-firebase-hooks/auth"
import ChatScreen from "../../components/ChatScreen"
import Sidebar from "../../components/Sidebar"
import { auth, db } from "../../firebase"

const specificChat = ({chat, messages}) => {
    const[user] = useAuthState(auth);
    return (
        <div className=" md:px-6 bg-gray-600 " >
           <Head>
               <title>Chat</title>
               <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png" />
           </Head>
        

                <div className="hidden md:flex justify-between">
                     <Sidebar  />
                    <ChatScreen chat={chat} messages={messages}/>
                </div>
                <div className="flex md:hidden">
                    <ChatScreen chat={chat} messages={messages}/>
                </div>
           
        

        </div>
    )
}

export default specificChat


export  async function getServerSideProps(context){

    const ref = db.collection('chats').doc(context.query.id);

    //prep the messages on server

    const messageRes= await ref.collection("messages")
    .orderBy("timestamp","asc")
    .get();

    const messages = messageRes.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    })).map(messages=>({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    //prep the chats

    const chatRes= await ref.get();
    const chat={
        id:chatRes.id,
        ...chatRes.data()
    }
   
    return{
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}
