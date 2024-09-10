import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/store/courseSlice";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userDetails = user.user;
        const _user = {
          displayName: auth.currentUser.displayName,
          email: userDetails.email,
          uid: userDetails.uid,
        };
        navigate("/");
        dispatch(login(_user));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   if (user.isAuthenticated) navigate("/home");
  // }, []);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center">
      <div className="flex min-w-[30vw] flex-col rounded-xl p-8  bg-white shadow-xl">
        <h1 className="font-slackfont text-3xl font-bold">SIGN IN</h1>

        <div className="mt-4">
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <Label className="font-slackfont font-semibold">Email</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="font-slackfont w-full rounded-lg border-2 px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <Label className="font-slackfont font-semibold">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="font-slackfont w-full rounded-lg border-2 px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 px-4 py-3 pt-6">
          <Button className="flex  w-full text-white" onClick={handleSignIn}>
            Sign In
          </Button>

          <div>
            <Label>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-blue-500 cursor-pointer"
              >
                Sign Up
              </span>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
