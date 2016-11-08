var boards = {
  featherHuzzah: [0,2,4,5,12,13,14,15],
  // NodeMCU: [D0,D2,D4,D12,D13,D14,D15]
  NodeMCU: [NodeMCU.D2]
};

export default function (board) {
  return boards[board];
}
