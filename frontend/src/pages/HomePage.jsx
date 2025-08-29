import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import RateLimitedUi from '../components/RateLimitedUi';
import NoteCard from '../components/NoteCard';

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/notes');
        const data = response.data;

        console.log(data);
        setNotes(data);
        setRateLimited(false);
      } catch (err) {
        console.log(err);
        // Safely check for 429 status
        if (err.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notes.map((note, index) => (
              <NoteCard key={index} note={note} />
            ))}
          </div>
        )}
        {notes.length === 0 && !loading && !isRateLimited && (
          <div className='text-center text-gray-500 py-10'>No notes found</div>
        )}
      </div>
    </div>
  )
}

export default HomePage