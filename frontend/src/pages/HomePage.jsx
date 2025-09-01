import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import RateLimitedUi from '../components/RateLimitedUi';
import api from '../lib/axios.js';
import NoNotes from './NoNotes';

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/notes');
        const data = response.data;

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
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}

          </div>
        )}
        {notes.length === 0 && !loading && !isRateLimited && (
          <NoNotes />
        )}
      </div>
    </div>
  )
}

export default HomePage