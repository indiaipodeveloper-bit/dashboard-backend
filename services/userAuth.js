import jwt from "jsonwebtoken";
const secretkeyforUser = "secretforuser"

export function setUser(user) {
  return jwt.sign({id:user._id,email:user.email,isAdmin:user.isAdmin}, secretkeyforUser,);
}

export function getUser(token) {
  return jwt.verify(token, secretkeyforUser);
}
