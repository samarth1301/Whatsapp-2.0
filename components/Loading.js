import Head from "next/head"
import Loader from "react-loader-spinner"

const Loading = () => {
    return (
        <div className="flex justify-center items-center gap-3 h-screen w-screen">
            <Head>
                <title>
                    Loading ...
                </title>
                    <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png" />
            </Head>
            <Loader type="Puff" color="#25D366" height={80} width={80} />


        </div>
    )
}

export default Loading
