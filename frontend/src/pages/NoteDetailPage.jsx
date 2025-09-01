import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios'


const NoteDetailPage = () => {
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/api/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                toast.error("Failed to fatch note")
                console.log("error in fatching note", error)
            } finally {
                setLoading(false)
            }
        }
        fetchNote()
    }, [id])
    console.log({ note })
    const handleDelete = async () => {
        if (!window.confirm("Are You Sure You Want To Delete This Note?")) return;
        try {
            await api.delete(`/api/notes/${id}`)
            toast.success("Note deleted")
            navigate('/')
        }
        catch {
            console.log("Error Deleting Note")
            toast.error("Filed To Delete Note")
        }
    }
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add title or content")
            return;
        }
        setSaving(true)
        try {
            await api.put(`/api/notes/${id}`, note)
            toast.success("Note Updated!")
            navigate('/')

        } catch (error) {
            console.log("Error updating Notes")
            toast.error("Failed to update note")
        }
        finally {
            setSaving(false)
        }

    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='min-h-screen bg-base-200 '>
            <div className='container mx-auto px-4 py-8'>
                <div className="max-w-2xl mx-auto">
                    <div className='flex items-center justify-between mb-6'>
                        <Link to='/' className='btn btn-ghost'>
                            <ArrowLeftIcon className='h-5 w-5' />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className='btn btn-error btn-outline'>
                            <Trash2Icon className='h-5 w-5' />
                            Delete Note
                        </button>
                    </div>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <div className="form-control">
                                <label className='label'>
                                    <span className='label-text'>Title </span>
                                </label>
                            </div>
                            <input type='text' placeholder='Note Title' className='w-full input input-bordered pl-4' value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />

                        </div>
                        <div className='card-body'>
                            <div className="form-control">
                                <label className='label'>
                                    <span className='label-text'>Content </span>
                                </label>
                            </div>
                            <textarea type='text' placeholder='Note Content' className='w-full h-32 input input-bordered p-4' value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
                        </div>
                        <div className='card-actions justify-end'>
                            <button className='btn btn-primary' disabled={saving} onClick={handleSave}>{saving ? "Saving..." : "Save Changes"}</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage