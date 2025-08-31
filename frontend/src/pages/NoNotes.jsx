import { Link } from "react-router"
const NoNotes = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <h1 className="text-xl font-semibold">There are no Notes Found</h1>
            <Link to='/create' className="btn btn-primary">
                Create your First Note
            </Link>
        </div>
    )
}

export default NoNotes