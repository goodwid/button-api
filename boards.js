var boards = {
  featherHuzzah: {
    buttons: [0,2,4,5,12,13,14,15]
  },
  NodeMCU: {
    buttons: [D2, D4]
  }
};

module.exports = function(board) {
  return boards[board];
}
