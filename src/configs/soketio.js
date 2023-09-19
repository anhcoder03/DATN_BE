import { Server } from "socket.io";
export const socketIo = (server) => {
  //todo Socket Server
  const io = new Server(server);
  //todo Trong thư viện Socket.IO của JavaScript, sự kiện "on" được sử dụng để lắng nghe các sự kiện từ máy chủ hoặc từ máy khách
  io.on("connection", (socket) => {
    console.log("connected socket io success", socket.id);
    socket.on("tao_phieu_kham", (data) => {
      socket.emit("notification-bacsi", data);
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
