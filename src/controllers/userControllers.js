export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => res.end();
export const editUser = (req, res) => res.send("Edit profile");
export const deleteUser = (req, res) => res.send("delete user");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
