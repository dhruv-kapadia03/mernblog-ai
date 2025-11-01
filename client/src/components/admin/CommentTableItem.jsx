// import React from 'react'
// import { assets } from '../../assets/assets';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const CommentTableItem = ({comment, fetchComments}) => {

//     const {axios} = useAppContext();

//     const {blog, createdAt, _id} = comment;
//     const BlogDate = new Date(createdAt);

//     const approveComment = async () => {
//         try {
//             const {data} = await axios.post('/api/admin/approve-comment', {id: _id});
//             if (data.success) {
//                 toast.success(data.message);
//                 fetchComments();
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     const deleteComment = async () => {
//         try {
//             const confirm = window.confirm('Are you sure you want to delete this comment?');
//             if (!confirm) return;

//             const {data} = await axios.post('/api/admin/delete-comment', {id: _id});
//             if (data.success) {
//                 toast.success(data.message);
//                 fetchComments();
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     return (
//         <tr className='order-y border-gray-300'>
//             <td className='px-6 py-4'>
//                 <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
//                 {/* <b className='font-medium text-gray-600'>Blog</b> : {blog?.title || '[Blog Deleted]'} */}
//                 <br />
//                 <br />
//                 <b className='font-medium text-gray-600'>Name</b> : {comment.name}
//                 <br />
//                 <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
//             </td>

//             <td className='px-6 py-4 max-sm:hidden'>
//                 {BlogDate.toLocaleDateString()}
//             </td>

//             <td className='px-6 py-4'>
//                 <div className='inline-flex items-center gap-4'>
//                     {!comment.isApproved ?
//                         <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer'/> :
//                         <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
//                     }
//                     <img onClick={deleteComment} src={assets.bin_icon} className='w-5 hover:scale-110 transition-all cursor-pointer'/>
//                 </div>
//             </td>
//         </tr>
//     )
// }

// export default CommentTableItem





import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
    const { axios } = useAppContext();
    const { blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteComment = async () => {
        try {
            setDeleting(true);
            const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeleting(false);
            setShowDeletePopup(false);
        }
    };


    // Delete Confirmation Popup (Rendered via React Portal)
    const deletePopup = showDeletePopup
        ? createPortal(
            <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-30 backdrop-blur-xs z-50">
                <div className="bg-white border rounded-xl shadow-lg p-6 w-80 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Delete Comment
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete this comment?
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={deleteComment}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition-all disabled:opacity-60 cursor-pointer"
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                            onClick={() => setShowDeletePopup(false)}
                            className="border border-gray-400 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )
    : null;

    return (
        <>
            <tr className="order-y border-gray-300">
                <td className="px-6 py-4">
                    <b className="font-medium text-gray-600">Blog</b> : {blog?.title || '[Blog Deleted]'}
                    <br />
                    <br />
                    <b className="font-medium text-gray-600">Name</b> : {comment.name}
                    <br />
                    <b className="font-medium text-gray-600">Comment</b> : {comment.content}
                </td>

                <td className="px-6 py-4 max-sm:hidden">{BlogDate.toLocaleDateString()}</td>

                <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-4">
                        {!comment.isApproved ? (
                            <img
                                onClick={approveComment}
                                src={assets.tick_icon}
                                className="w-5 hover:scale-110 transition-all cursor-pointer"
                            />
                            ) : (
                            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
                                Approved
                            </p>
                        )}
                        <img
                            onClick={() => setShowDeletePopup(true)}
                            src={assets.bin_icon}
                            className="w-5 hover:scale-110 transition-all cursor-pointer"
                        />
                    </div>
                </td>
            </tr>
            {deletePopup}
        </>
    );
};

export default CommentTableItem;

