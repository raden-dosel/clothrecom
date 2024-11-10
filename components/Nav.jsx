"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { ModeToggle } from "./Toggle_Button";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <nav className=" pt-3 mb-6 w-full flex-between">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className=" font-bold">
          <Link className="text-primary" href="/">
            ClothingRecom
          </Link>
        </h3>

        {/* Desktop Navigation */}

        <div className="hidden sm:flex space-x-4">
          <ModeToggle />
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt">
                <Button className=" bg-secondary rounded-full hover:bg-accent hover:text-primary-foreground hover:border-transparen">
                  Create Prompt
                </Button>
              </Link>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  className="rounded-full object-contain"
                  width={37}
                  height={37}
                  alt="profile"
                ></Image>
              </Link>
              <Button
                onClick={() => signOut()}
                className="bg-transparent text-foreground border border-foreground hover:bg-accent hover:text-primary-foreground hover:border-transparent"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="bg-transparent text-foreground border border-foreground hover:bg-secondary hover:text-primary-foreground"
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}

        <div className="sm:hidden flex relative space-x-4">
          <ModeToggle />
          {session?.user ? (
            <div className="flex">
              <DropdownMenu className="">
                <DropdownMenuTrigger className="" asChild>
                  <Image
                    src={session?.user.image}
                    className="rounded-full hover:cursor-pointer hover:border hover:border-primary"
                    width={37}
                    height={37}
                    alt="profile"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="my-2">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/create-prompt" className="my-2">
                      Create Prompt
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Button
                      variant="text"
                      onClick={() => signOut()}
                      className="p-0"
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="bg-transparent text-foreground border border-foreground hover:bg-secondary hover:text-primary-foreground"
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
