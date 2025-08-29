import React from 'react';

const CreatePage = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Create Note</h1>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Title</label>
          <input placeholder='title'></input>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700' placeholder="content">Content</label>
          <textarea> </textarea>
        </div>
        <button className='btn btn-primary' disabled={loading}>
          {loading ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  )
}

export default CreatePage