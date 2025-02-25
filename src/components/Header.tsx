'use client'
import { faMugHot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {parseFullName} from 'parse-full-name'

export default function Header({session}: {session:Session | null}){

  const username = session?.user?.name || ""
  const firstName = parseFullName(username).first
  //const tmpUsername = session?.user?.email;

    return(
        <>
        <header className="mb-4">
          <div className="flex justify-between max-w-2xl mx-auto px-4 py-4">
            <Link href={'/'} className="inline-flex gap-1 items-center">
            <FontAwesomeIcon icon={faMugHot} className="h-8"/>
            <span className="mt-2">Buy me a coffee</span>
          </Link>
          <nav className="mt-2 flex gap-6 items-center">
            <Link href={'/about'} >About</Link>
            <Link href={'/contact'} >Contact</Link>
            <Link href={'/faq'} >FAQ</Link>
            <div className="flex gap-2">
              {session && (
                <div className="">
                  <Link href={"/profile"}
                    className="flex items-center gap-2 bg-yellow-300 rounded-full p-1 pr-4"
                  >
                    <Image 
                      src={session.user?.image as string} 
                      className="rounded-full "
                      height={36} 
                      width={36} 
                      alt="user profile picture"/>
                  <p>{firstName}</p>
                  </Link>
                </div>
              )}
              {!session && (
                <>
                <button 
                  className="border-2 rounded-full px-4 py-2 ml-4" 
                  onClick={() => signIn('google')}
                  >
                  Login
                </button>
                <button
                  className="bg-yellow-300 rounded-full px-4 py-2"
                  >
                  Sign up
                  </button>
                </>
              )}
            </div>
          </nav>
          </div>
        </header>
        </>
    )
} 

