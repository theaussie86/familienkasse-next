import Image from "next/image";
import { getServerSession } from "next-auth";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { authOptions } from "@/libs/next-auth";

export default async function Login() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session && session.user) redirect("/");

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-20 w-20"
            width={80}
            height={80}
            src="/favicon.ico"
            alt="Weissteiner Familienkasse Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Melde dich an
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div>
              <GoogleLoginButton provider={providers.google} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
