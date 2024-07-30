import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { id } = useParams();
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const yourAuthToken = localStorage.getItem('token');
  console.log(`token  ${yourAuthToken}`);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch(`http://localhost:5430/api/v1/audiobooks?category=${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        console.log("API Response: ", data);

        setAudiobooks(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, [id]);

  const handleReviewSubmit = async (audiobookId, rating, comment) => {
    try {
      console.log(`token  ${yourAuthToken}`);
      const response = await fetch(`http://localhost:5430/api/v1/audiobooks/${audiobookId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAuthToken}`, // Replace with your auth token logic
        },
        body: JSON.stringify({ rating, comment }),
      });
      
      if (!response.ok) throw new Error('Failed to submit review');
      const data = await response.json();
      console.log("data : ", data);
      // Update state with new review
      setAudiobooks(audiobooks.map(book => 
        book._id === audiobookId ? data.data : book
      ));
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Audiobooks in Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {audiobooks.length > 0 ? (
          audiobooks.map((book) => (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={book._id}>
              <img
                src={book.coverimage}
                alt={book.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-700 mb-2">{book.description}</p>
                <div className="flex items-center mt-2">
                  <img
                    src={book.owner.avatar} // Ensure this field is available
                    alt={book.owner.fullname}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p className="text-gray-900 font-semibold">{book.owner.fullname}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
                  {book.reviews.length > 0 ? (
                    book.reviews.map((review) => (
                      <div key={review._id} className="border-t pt-2 mt-2">
                        <div className="flex items-center mb-2">
                          <img
                            src={review.user.avatar} // Ensure user has avatar field
                            alt={review.user.fullname}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <p className="font-semibold">{review.user.fullname}</p>
                        </div>
                        <p className="text-gray-600">Rating: {review.rating}</p>
                        <p className="text-gray-800">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Add a Review:</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const rating = formData.get('rating');
                      const comment = formData.get('comment');
                      handleReviewSubmit(book._id, rating, comment);
                    }}
                  >
                    <div className="mb-2">
                      <label htmlFor="rating" className="block text-sm font-medium mb-1">Rating (1-5):</label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        required
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="comment" className="block text-sm font-medium mb-1">Comment:</label>
                      <textarea
                        id="comment"
                        name="comment"
                        required
                        className="p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">No audiobooks found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;





