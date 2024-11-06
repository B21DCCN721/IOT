const sortMiddleware = (req, res, next) => {
    res.locals._sort = {
        type: 'default',
        check: false,
    }
    if(req.query.hasOwnProperty("_sort")){
        res.locals._sort.check = true;
        res.locals._sort.type = req.query.type;
        res.locals._sort.column = req.query.column;
    }
    next();
}

module.exports = { sortMiddleware} ;