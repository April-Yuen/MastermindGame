module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs", {title: 'Mastermind Login Portal', layout: './layouts/setup'});
    },
};