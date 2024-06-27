const { post } = require('../models')
const { user } = require('../models')

const handlePostPost = async (req, res) => {
        const { body, userUuid } = req.body
        try {
                const user1 = await user.findOne({ where: { uuid: userUuid } })
                const post1 = await post.create({ body, userId: user1.id })
                return res.status(201).json(post1)
        } catch (err) {
                console.log(err);
                return res.status(500).json(err)
        }
}

const handleGetPost = async (req, res) => {
        try {
                const post1 = await post.findAll()
                return res.status(200).json(post1)
        } catch (err) {
                console.log(err);
                return res.status(500).json(err)
        }
}

const handleDeletePost = async (req, res) => {
        const uuid = req.params.uuid
        try {
                const post1 = await post.findOne({ where: { uuid } })
                post1.destroy()
                res.status(200).json("User succesfully deleted")
        } catch (err) {
                console.log(err);
                return res.status(500).json(err)
        }
}

const handleEditPost = async (req, res) => {
        const uuid = req.params.uuid
        const { body, userId } = req.body
        try {
                const post1 = await post.findOne({ where: { uuid } })
                post1.body = body;
                post1.userId = userId;
                post1.save()
                res.status(200).json(post1)
        } catch (err) {
                console.log(err);
                return res.status(500).json(err)
        }
}

const handlePostWithUser = async (req, res) => {
        try {
                const post1 = await post.findAll({ include: ['user'] })
                return res.status(200).json(post1);
        } catch (err) {
                console.log(err);
                return res.status(500).json(err)
        }
}




module.exports = {
        handlePostPost,
        handlePostWithUser,
        handleGetPost,
        handleDeletePost,
        handleEditPost
}
