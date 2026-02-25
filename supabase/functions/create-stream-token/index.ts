// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// Supabase Edge Function (Deno runtime)
import { StreamChat } from "npm:stream-chat@8.14.4";

Deno.serve(async (req: Request) => {
  try {
    const { user_id } = await req.json();

    const apiKey = Deno.env.get("STREAM_API_KEY")!;
    const apiSecret = Deno.env.get("STREAM_SECRET")!;

    const client = StreamChat.getInstance(apiKey, apiSecret);

    const token = client.createToken(user_id);

    return Response.json({ token });

  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
});
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-stream-token' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
