var boards = {
  featherHuzzah: {
    buttons: [0,2,4,5,12,13,14,15]
  },
  NodeMCU: {
    buttons: [2, 4]
  }
};

module.exports = function(board) {
  return boards[board];
}
