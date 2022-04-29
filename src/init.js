import "regenerator-runtime";
import "dotenv/config";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import "./models/Comment.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;
/* HEROKU에서 서버에 연결할 때는 HEROKU에서 제공하는 포트를 사용해야함.
그 외에 내 컴퓨터에서 사용할 때는 localhost의 포트를 사용하도록 설정함. */ㄴ

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
