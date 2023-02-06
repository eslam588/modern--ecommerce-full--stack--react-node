"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updatereview = exports.deletereview = exports.getallreviews = exports.productsreviews = exports.getproductsbycat = exports.getrandomproducts = exports.getproducts = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _extraReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//get all products
var getproducts = (0, _toolkit.createAsyncThunk)('product/getproducts', function _callee(_ref, thunkAPI) {
  var keyword, page, categoriesname, rejectWithValue, url, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          keyword = _ref.keyword, page = _ref.page, categoriesname = _ref.categoriesname;
          rejectWithValue = thunkAPI.rejectWithValue;
          _context.prev = 2;
          console.log(categoriesname);
          url = "http://localhost:8000/product/getallproducts".concat(page ? "?page=".concat(page) : "").concat(keyword ? "&keyword=".concat(keyword) : "").concat(categoriesname ? "&catName=".concat(categoriesname) : "");
          _context.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].get(url, {
            header: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }));

        case 7:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", rejectWithValue(_context.t0.message));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
}); //get random products

exports.getproducts = getproducts;
var getrandomproducts = (0, _toolkit.createAsyncThunk)('product/getrandomproducts', function _callee2(thunkAPI) {
  var rejectWithValue, url, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context2.prev = 1;
          url = "http://localhost:8000/product/getrandomproducts";
          _context2.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get(url, {
            header: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }));

        case 5:
          res = _context2.sent;
          console.log(res);
          return _context2.abrupt("return", res);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", rejectWithValue(_context2.t0.message));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //get all products

exports.getrandomproducts = getrandomproducts;
var getproductsbycat = (0, _toolkit.createAsyncThunk)('product/getproductsbycat', function _callee3(catName, thunkAPI) {
  var rejectWithValue, url, res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context3.prev = 1;
          console.log(catName);
          url = "http://localhost:8000/product/getproductsbycat".concat(catName ? "?catName=".concat(catName) : "");
          _context3.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].get(url, {
            header: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }));

        case 6:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", rejectWithValue(_context3.t0.message));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // export const getproductsbydiscount = createAsyncThunk('product/getproductsbydiscount',async(thunkAPI) => {
//     const {rejectWithValue} = thunkAPI
//     try{
//         let url = `http://localhost:8000/product/getproductsbydiscount`
//         const res= await axios.get(url,{
//             header:{
//                 'Content-type': 'application/json; charset=UTF-8'
//             }
//         })
//         return res
//     }
//     catch(e){
//         return rejectWithValue(e.message)
//     }
// }) 

exports.getproductsbycat = getproductsbycat;
var productsreviews = (0, _toolkit.createAsyncThunk)('product/productsreviews', function _callee4(data, thunkAPI) {
  var rejectWithValue, token, url, res;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context4.prev = 1;
          token = JSON.parse(localStorage.getItem("token"));
          url = "http://localhost:8000/product/addcomment/".concat(data.productId);
          _context4.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].post(url, data.reviews, {
            headers: {
              'Authorization': token
            }
          }));

        case 6:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", rejectWithValue(_context4.t0.message));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.productsreviews = productsreviews;
var getallreviews = (0, _toolkit.createAsyncThunk)('product/getallreviews', function _callee5(productId, thunkAPI) {
  var rejectWithValue, token, url, res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context5.prev = 1;
          token = JSON.parse(localStorage.getItem("token"));
          url = "http://localhost:8000/product/getallcomments/".concat(productId);
          _context5.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].get(url, {
            headers: {
              'Authorization': token
            }
          }));

        case 6:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", rejectWithValue(_context5.t0.message));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //delete review

exports.getallreviews = getallreviews;
var deletereview = (0, _toolkit.createAsyncThunk)('product/deletereview', function _callee6(data, thunkAPI) {
  var rejectWithValue, token, url, res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context6.prev = 1;
          token = JSON.parse(localStorage.getItem("token"));
          url = "http://localhost:8000/product/deletecomment/".concat(data.productId).concat(data.reviewId ? "?reviewId=".concat(data.reviewId) : "");
          _context6.next = 6;
          return regeneratorRuntime.awrap(_axios["default"]["delete"](url, {
            headers: {
              'Authorization': token
            }
          }));

        case 6:
          res = _context6.sent;
          return _context6.abrupt("return", res);

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", rejectWithValue(_context6.t0.message));

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // update review

exports.deletereview = deletereview;
var updatereview = (0, _toolkit.createAsyncThunk)('product/updatereview', function _callee7(productId, thunkAPI) {
  var rejectWithValue, token, url, res;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          rejectWithValue = thunkAPI.rejectWithValue;
          _context7.prev = 1;
          token = JSON.parse(localStorage.getItem("token"));
          url = "http://localhost:8000/product/updatecomment/".concat(productId);
          _context7.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].patch(url, {
            headers: {
              'Authorization': token
            }
          }));

        case 6:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", rejectWithValue(_context7.t0.message));

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
exports.updatereview = updatereview;
var productSlice = (0, _toolkit.createSlice)({
  name: "product",
  initialState: {
    data: {},
    randomproducts: {},
    salesproducts: {},
    productsbycat: {},
    error: null,
    isLoading: false,
    reviews: []
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, getproducts.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, getproducts.fulfilled, function (state, action) {
    state.isLoading = false;
    state.data = action.payload.data.data;
  }), _defineProperty(_extraReducers, getproducts.rejected, function (state, action) {
    state.isLoading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, getrandomproducts.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, getrandomproducts.fulfilled, function (state, action) {
    state.isLoading = false;
    console.log(action.payload.data.data);
    state.randomproducts = action.payload.data.data;
  }), _defineProperty(_extraReducers, getrandomproducts.rejected, function (state, action) {
    state.isLoading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, getproductsbycat.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, getproductsbycat.fulfilled, function (state, action) {
    state.isLoading = false;
    state.productsbycat = action.payload.data.data;
  }), _defineProperty(_extraReducers, getproductsbycat.rejected, function (state, action) {
    state.isLoading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, productsreviews.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, productsreviews.fulfilled, function (state, action) {
    state.isLoading = false;
    state.data = action.payload.data.data;
  }), _defineProperty(_extraReducers, productsreviews.rejected, function (state, action) {
    state.isLoading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, getallreviews.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, getallreviews.fulfilled, function (state, action) {
    state.isLoading = false;
    state.reviews = action.payload.data.data;
  }), _defineProperty(_extraReducers, getallreviews.rejected, function (state, action) {
    state.isLoading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, deletereview.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, deletereview.fulfilled, function (state, action) {
    state.isLoading = false;
  }), _defineProperty(_extraReducers, deletereview.rejected, function (state, action) {
    state.isLoading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, updatereview.pending, function (state, action) {
    state.isLoading = true;
    state.error = null;
  }), _defineProperty(_extraReducers, updatereview.fulfilled, function (state, action) {
    state.isLoading = false;
  }), _defineProperty(_extraReducers, updatereview.rejected, function (state, action) {
    state.isLoading = false;
  }), _extraReducers)
});
var _default = productSlice.reducer;
exports["default"] = _default;