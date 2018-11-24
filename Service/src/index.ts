import server from "./service";

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
