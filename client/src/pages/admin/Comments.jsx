import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CommentTableItem from '../../components/admin/CommentTableItem';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/comments');

      if (data.success) {
        setComments(data.comments || []);
      } else {
        toast.error(data.message || 'Failed to fetch comments');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Header and Filter Buttons */}
      <div className="flex justify-between items-center max-w-3xl">
        {/* <h1 className="text-xl font-semibold text-gray-700">Comments</h1> */}
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button onClick={() => setFilter('Approved')} className={`shadow-custome-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary border-primary' : 'text-gray-700'}`}>
            Approved
          </button>

          <button onClick={() => setFilter('Not Approved')} className={`shadow-custome-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary border-primary' : 'text-gray-700'}`} >
            Not Approved
          </button>
        </div>
      </div>
      
      {/* Comments Table Section */}
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide p-2">
        {comments.length === 0 ? (
          <p className="text-center text-gray-600 py-8">No comments found.</p>
          ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Blog title & Comment</th>
                <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {comments
                .filter((comment) => {
                  if (filter === 'Approved') return comment.isApproved === true;
                  if (filter === 'Not Approved') return comment.isApproved === false || !comment.isApproved;
                  return true;
                })
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Comments;