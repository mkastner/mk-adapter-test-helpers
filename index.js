module.exports = {
  req: {
    params: {}
  },
  res: {
    status(val) {
      this._status = val;
      return this;
    },
    viewName: '',
    data: {
    },
    render(view, viewData) {
      let viewName = view;
      let data = viewData;
    },
    json(jsonObj) {
      this.data = jsonObj; 
    }
  }
};
