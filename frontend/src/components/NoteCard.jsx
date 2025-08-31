import toast from "react-hot-toast"
import { Link } from "react-router"
import api from "../lib/axios"
const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("Are Sure You Want To Delete This Note?")) return
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("Note Deleted Successfully")
        } catch (error) {
            console.log("error in handleDelete", error)
            toast.error("failed to delete notes")
        }

    }


    const handleCreateButton = (e) => {
        e.preventDefault()
        alert("Edit functionality coming soon!");
    }

    return (
        <Link
            to={`/note/${note._id}`} key={note._id}
            className="block bg-gray-800 border-t-4 border-green-400 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
            <div className="space-y-3">
                <h3 className="text-white text-lg font-semibold leading-tight">
                    {note.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    {note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
                </p>
                <div className="flex justify-between items-center pt-2">
                    <div className="text-gray-400 text-xs">
                        Created on - {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleCreateButton} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                        </button>
                        <button onClick={(e) => handleDelete(e, note._id)} className="text-gray-400 hover:text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard 