export async function sendNotification(
  token: string,
  title: string,
  body: string
) {

  await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/create-notification`,
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        title,
        body,
      }),
    }
  );

}