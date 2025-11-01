import jwt from 'jsonwebtoken';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js'

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Invalid credentials."})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({success: true, token})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getAllComments = async (req, res) => {
    try {
        // const comments = await Comment.find({}).populate('blog').sort({createdAt: -1});
        const comments = await Comment.find({}).populate({
                path: 'blog',
                options: { strictPopulate: false }
            }).sort({createdAt: -1});
        if (!comments.length) {
            return res.json({ success: true, comments: [] });
        }
        res.json({success: true, comments})
    } catch (error) {
        // res.json({success: false, message: error.message})
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message: "Comment deleted successfully."})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const approveCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message: "Comment approved successfully."})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {
    adminLogin,
    getAllBlogsAdmin,
    getAllComments,
    getDashboard,
    deleteCommentById,
    approveCommentById
};