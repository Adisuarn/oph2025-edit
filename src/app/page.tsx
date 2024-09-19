'use client'
import { elysia } from '../lib/api'
import GoogleOAuthButton from '@/components/GoogleOAuthButton';

// Example for fetch api
// const fetch = elysia.pathapi
// localhost:3000/api/swagger to test api

function HomePage() {
  return (
    <main>
        <h1>Home</h1>
        <GoogleOAuthButton />
    </main>
  );
}

export default HomePage
