import io from "socket.io-client";

let socket = io("http://vmradioxenter.southcentralus.cloudapp.azure.com:4002", {
  reconnectionAttempts: 5,
});

export default socket;
