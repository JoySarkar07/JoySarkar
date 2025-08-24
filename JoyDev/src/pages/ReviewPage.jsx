import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import { addReview, updateReview } from '../services/apiServices';

const ReviewPage = () => {
  const [review, setReview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(review){
        setMessage("You already submit a review. Just update It.");
        setTimeout(() => {
            setMessage("");
        }, 3000);
        return;
    }
    if( formData.rating === 0 ){
        setMessage("Please give me some rating.");
        setTimeout(() => {
            setMessage("");
        }, 3000);
        return;
    }
    if (!formData.name || !formData.review) return;
    
    setIsSubmitting(true);

    try{
        let response;
        if(formData._id){
            const id = formData._id;
            const data = {name:formData.name, review:formData.review, rating:formData.rating};
            response = await updateReview(id, data);
        }else{
            response = await addReview(formData);
        }
        setReview(response);
        setFormData({name: '', review: '', rating: 0 });
        setMessage("Thankyou! Your review submited successfully .");
    }catch(e){
        setMessage("Some error occured : "+e.message);
    }finally{
        setIsSubmitting(false);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }
  };

  const setForEdit = ()=>{
    setFormData(review);
    setReview(null);
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white py-12 px-4">
        {
            message && <motion.p 
                initial={{x:-100, opacity:0}}
                animate={{x:0, opacity:1, transition:{duration:1, delay:0.5}}}
                className='absolute top-2 left-5 font-medium text-green-300 bg-gradient-to-bl from-cyan-700 to-gray-700 p-3 rounded-2xl'>
                    {message}
                </motion.p>
        }
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-1">Reviews</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Share your experience working with me. Your feedback helps me grow and improve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Review Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Add Your Review</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-2xl ${star <= (hoverRating || formData.rating) ? 'text-yellow-400' : 'text-slate-400'} transition-transform hover:scale-110`}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {star <= (hoverRating || formData.rating) ? '★' : '☆'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="review" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Share your experience working with me..."
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  formData._id ? "Update Review" :'Submit Review'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Reviews List */}
          <div className="space-y-6">
            <AnimatePresence>
              {review ? (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-slate-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{review.name}</h3>
                        <p className="text-slate-400 text-sm">{formatDate(review.createdAt)}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${i < review.rating ? 'text-yellow-400' : 'text-slate-600'}`}
                          >
                            {i < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-blue-100">{review.review}</p>
                    <motion.button
                        whileHover={{scale:1.1}}
                        onClick={()=>setForEdit()}
                        className='absolute bottom-2 right-2 bg-green-600 p-2 rounded-xl cursor-pointer'
                    >
                        <FaEdit className='text-black' />
                    </motion.button>
                  </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12 bg-slate-800 bg-opacity-30 rounded-2xl"
                >
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-xl font-medium">No reviews yet</h3>
                  <p className="text-blue-200 mt-2">Be the first to share your experience!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;