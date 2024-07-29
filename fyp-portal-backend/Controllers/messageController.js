const Message = require('../models/Message');
const { getIO } = require('../socket');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ projectId: req.params.projectId })
      .populate('sender', 'profile.fullName username')
      .sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message({
      content: req.body.content,
      sender: req.user._id,
      projectId: req.params.projectId
    });
    await message.save();
    const populatedMessage = await message.populate('sender', 'profile.fullName username');
    const io = getIO();
    io.to(req.params.projectId).emit('message', populatedMessage);
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
};
