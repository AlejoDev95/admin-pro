import jwt from "jsonwebtoken";

export const generateToken = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const privateKey = process.env.JWT_SECRET ?? "";
    jwt.sign(
      payload,
      privateKey,
      {
        expiresIn: "12h",
      },
      (error, jwt) => {
        if (error) {
          console.error(error);
          reject(new Error("Token could not be generated"));
        }

        resolve(jwt);
      }
    );
  });
};
