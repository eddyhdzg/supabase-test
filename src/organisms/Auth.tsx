import Google from "assets/Google";
import Github from "assets/Github";
import { AuthButton } from "components";

const Auth = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-1">
      <div className="w-11/12 max-w-md p-5 shadow flex flex-col dark:bg-zinc-800">
        <span className="text-lg mb-4">Sign in with</span>
        <div>
          <div className="space-y-4">
            <AuthButton provider="google">
              <Google className="mr-3 text-lg" />
              Sign in with Google
            </AuthButton>
            <AuthButton provider="github">
              <Github className="mr-3 text-lg" />
              Sign in with Github
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
