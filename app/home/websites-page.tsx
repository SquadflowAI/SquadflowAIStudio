import ChatInput from "../ui/chat-input";
import CardGridWebsites from "./card-grid-websites";

export default function WebsitesPage() {

    return (
        <div className="p-4 sm:ml-64">
            <div className="preview-container">
                <div className="flex flex-col ">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Websites</h4>
                    <div className="p-4 md:p-5 space-y-4">
                    <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Start building</div>
                        <ChatInput></ChatInput>
                    </div>
                    <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Your recent websites</h4>
                    <CardGridWebsites></CardGridWebsites>
                </div>
            </div>
        </div>)
}