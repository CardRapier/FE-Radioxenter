import io from "socket.io-client";

let socket = io("", {
  reconnectionAttempts: 5,
});

let socketData = null;

const getData = async () => {
  socket.on("data", (msg) => {
    socketData = msg;
  });
};

export { getData, socketData };
export default socket;
