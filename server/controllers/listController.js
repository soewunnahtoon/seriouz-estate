import { List } from "../models/listModel.js";

const createList = async (req, res, next) => {
  try {
    const list = await List.create(req.body);

    return res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};

const deleteList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "List Not Found." });
    }

    if (req.user.id !== list.userRef) {
      return res.status(401).json({
        success: false,
        message: "You can only Delete on Your Own List.",
      });
    }

    await List.findByIdAndDelete(req.params.id);

    return res.status(200).json("List has been Deleted.");
  } catch (error) {
    next(error);
  }
};

const updateList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "List Not Found." });
    }
    if (req.user.id !== list.userRef) {
      return res.status(401).json({
        success: false,
        message: "You can only Update on Your Own List.",
      });
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "List Not Found." });
    }

    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const searchLists = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const lists = await List.find({
      name: { $regex: search, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};

export { createList, deleteList, updateList, getList, searchLists };
