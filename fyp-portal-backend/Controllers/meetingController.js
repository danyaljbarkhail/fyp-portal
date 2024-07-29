const Meeting = require('../models/Meeting');

const createMeeting = async (req, res) => {
  try {
    const { meetingType, time, location, date, projectId } = req.body;

    const meeting = new Meeting({
      meetingType,
      time,
      location,
      date,
      project: projectId
    });

    await meeting.save();

    res.status(201).json({ message: 'Meeting created successfully', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
};

const getMeetings = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const meetings = await Meeting.find({ project: projectId });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error: error.message });
  }
};

module.exports = { createMeeting, getMeetings };
