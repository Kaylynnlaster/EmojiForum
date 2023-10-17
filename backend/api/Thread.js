const express = require("express");
const router = express.Router();

const Thread = require("./../models/Thread.js");
const User = require("./../models/User");

const generateID = () => Math.random().toString(36).substring(2, 10);

router.get("/:id/thread", async (req, res) => {
  try {
    const thread = await Thread.find({});
    res.status(200).json(thread);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "could not get threads",
    });
  }
});

router.get("/:id/thread/:threadid", async (req, res) => {
  try {
    const { threadid } = req.params;
    const thread = await Thread.findById(threadid);
    res.status(200).json(thread);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/thread/create", async (req, res) => {
  //create the thread from the body
  let { title, description } = req.body;
  title = title.trim();
  description = description.trim();

  //grab the user id from the params
  const { id } = req.params;

  //find the user using the id grabbed earlier
  const user = await User.findById(id);
  console.log(user);

  let threadid = generateID();

  //get time stamp
  const date = new Date();
  const createdAt = date.toLocaleDateString();

  //save the thread obj with the user element
  const newThread = new Thread({
    id: threadid,
    title,
    description,
    createdAt,
    user,
  });

  newThread
    .save()
    .then((result) => {
      res.json({
        status: "Success",
        message: "Thread create successful",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: "Failed",
        message: "Error while saving the thread",
      });
    });
});

router.put("/:id/thread/:threadid/edit", async (req, res) => {
  try {
    const { threadid } = req.params;
    const thread = await Thread.findByIdAndUpdate(threadid, req.body);

    if (!thread) {
      return res.json({
        status: "Failed",
        message: "No Thread with that id",
      });
    }
    const updatedThread = await Thread.findById(id);
  } catch (error) {
    res.json({
      status: "Success",
      message: "Thread successfully updated",
    });
  }
});

router.delete("/:id/thread/:threadid", async (req, res) => {
  try {
    const { threadid } = req.params;
    const thread = await Thread.findByIdAndDelete(threadid);
    if (!thread) {
      return res.json({
        status: "Failed",
        message: "No Thread with that id",
      });
    }
    res.status(200).json(thread);
  } catch (error) {
    res.json({
      status: "Success",
      message: "Thread successfully deleted",
    });
  }
});

module.exports = router;
