// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// @ts-ignore: Deno runtime import
// @ts-ignore
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { StreamClient } from "npm:@stream-io/node-sdk@^0.2.0"

const API_KEY = Deno.env.get('STREAM_API_KEY') || ''
const API_SECRET = Deno.env.get('STREAM_API_SECRET') || ''

serve(async (req: Request) => {
  // Handle CORS untuk request dari HP
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { userId } = await req.json()

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID dibutuhkan' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } 
      })
    }

    const client = new StreamClient(API_KEY, API_SECRET)
    
    // Token berlaku 24 jam
    const validity = Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    const token = client.createToken(userId, validity)

    return new Response(JSON.stringify({ token }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 200
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
})
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-stream-token' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
