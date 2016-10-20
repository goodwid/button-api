var boards = {
  featherHuzzah: [0,2,4,5,12,13,14,15]
  // NodeMCU: [D2, D4]
};

module.exports = function(board) {
  return boards[board];
}
