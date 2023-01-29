const func = require("../utils/csv_to_array.js");
const json2csv = require("json2csv").parse;

exports.books = async (req, res) => {
  try {
    let books = await func.csv_to_array("books");
    if (req.query.email) {
      books = books.filter((book) => {
        return book.authors
          .toLowerCase()
          .includes(req.query.email.toLowerCase());
      });
    }
    if (req.query.isbn) {
      books = books.filter((book) => {
        return book.isbn.includes(parseInt(req.query.isbn));
      });
    }
    if (!books) books = [];
    res.status(200).render("books", {
      path: "/Books",
      pageTitle: "Books",
      books,
    });
  } catch (err) {
    res.status(400).render("error", {
      path: "/Books",
      pageTitle: "Books",
      error: err.message,
    });
  }
};

exports.authors = async (req, res) => {
  try {
    const authors = await func.csv_to_array("authors");
    res.status(200).render("authors", {
      path: "/Authors",
      pageTitle: "Books",
      authors,
    });
  } catch (err) {
    res.status(400).render("authors", {
      path: "/Authors",
      pageTitle: "Books",
      error: err.message,
    });
  }
};

exports.magazine = async (req, res) => {
  try {
    let magazines = await func.csv_to_array("magazines");
    if (req.query.email) {
      magazines = magazines.filter((magazine) => {
        return magazine.authors
          .toLowerCase()
          .includes(req.query.email.toLowerCase());
      });
    }
    if (req.query.isbn) {
      magazines = magazines.filter((magazine) => {
        return magazine.isbn.includes(parseInt(req.query.isbn));
      });
    }
    if (!magazines) magazines = [];
    res.status(200).render("magazines", {
      path: "/magazines",
      pageTitle: "Books",
      magazines,
    });
  } catch (err) {
    res.status(400).render("magazines", {
      path: "/magazines",
      pageTitle: "Books",
      error: err.message,
    });
  }
};

exports.sorted = async (req, res) => {
  try {
    let magazines = await func.csv_to_array("magazines");
    let books = await func.csv_to_array("books");
    let items = books.concat(magazines);
    items.sort(func.compare);
    res.status(200).render("sorted", {
      path: "/sorted",
      pageTitle: "Books",
      items,
    });
  } catch (err) {
    res.status(400).render("sorted", {
      path: "/sorted",
      pageTitle: "Books",
      error: err.message,
    });
  }
};

exports.download = async (req, res) => {
  try {
    let magazines = await func.csv_to_array("magazines");
    let books = await func.csv_to_array("books");
    let items = books.concat(magazines);
    obj = {
      title: "new book",
      isbn: "1230-1233-123",
      authors: "James Babu",
      description: "Added by me",
      publishedAt: new Date(),
    };
    items.unshift(obj);

    const csvString = json2csv(items);
    res.setHeader(
      "Content-disposition",
      "attachment; filename=raftlabs-updated.csv"
    );
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvString);
  } catch (err) {
    res.render("sorted", {
      path: "/download",
      pageTitle: "Books",
      error: err.message,
    });
  }
};

exports.error = function (req, res) {
  res.status(404).render("error", {
    path: "",
    pageTitle: "Error",
    error: "Page Not Found",
  });
};
