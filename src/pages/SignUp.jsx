import { useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("Register succesfully");
      await updateProfile(auth.currentUser, {
        displayName: fname + " " + lname,
      });

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center bg-slack-Auberginie">
      <div className="flex min-w-[30vw] flex-col rounded-xl bg-slack-green p-8 bg-white  shadow-xl">
        <h1 className="font-slackfont text-3xl font-bold">SIGN UP</h1>

        <div className="mt-4">
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <Label className="font-slackfont font-semibold">First Name</Label>
            <Input
              type="text"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              placeholder="Enter your First Name"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <Label className="font-slackfont font-semibold">LastName</Label>
            <Input
              type="text"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
              placeholder="Enter your Last Name"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-3 px-4 py-2">
            <Label className="font-slackfont font-semibold">Email</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
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
              className="w-full rounded-lg border-2 px-4 py-2 font-slackfont focus:outline-none"
            />
          </div>
        </div>

        <Button className="mt-4" onClick={handleSignUp}>
          SIGN UP
        </Button>
        <div className="mt-3">
          Already a member{" "}
          <Link to="/signin" className="underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
