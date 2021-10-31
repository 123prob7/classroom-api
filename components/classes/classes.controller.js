import Classes from "./model.classes.js";

const getClassList = (req, res) => {
  Classes.find({}).exec((err, c) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    c.status = 200;
    res.status(200).json({ data: [...c] });
  });
};

const addNewClass = (req, res) => {
  const { className, section } = req.body;

  Classes.create({ className, section }, (err, c) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    res.json({ newItem: c, status: 200, message: "Class was created successfully!" });
  });
};

const deleteClasses = (req, res) => {
  Classes.deleteMany({}, (err) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    res.json({ message: "All classes have been wiped out!" });
  });
};

export default {
  getClassList,
  addNewClass,
  deleteClasses,
};
