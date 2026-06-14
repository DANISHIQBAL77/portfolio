import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Parse the incoming data sent from your page.js form
    const { name, email, message } = await request.json();

    // Quick validation check
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // 2. Fetch your Telegram username securely from your environment variables
    // Remember to include the '@' symbol in your environment variable value!
    const telegramUser = process.env.TELEGRAM_USERNAME;

    if (!telegramUser) {
      console.error("❌ Setup Error: TELEGRAM_USERNAME is missing from .env.local");
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // 3. Format the text layout exactly how you want it to appear on your phone
    const textMessage = `📩 New Portfolio Message\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;
    const formattedMessage = encodeURIComponent(textMessage);

    // 4. Dispatch the alert request to the CallMeBot API
    const response = await fetch(
      `https://api.callmebot.com/text.php?user=${telegramUser}&text=${formattedMessage}`
    );

    // 5. Let your frontend UI know if the dispatch succeeded or failed
    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      const botResponseText = await response.text();
      console.error("👉 Rejection Reason:", botResponseText);
      return NextResponse.json({ error: 'Telegram dispatch failed.' }, { status: 500 });
    }

  } catch (err) {
    console.error("❌ Server Error inside Contact Route:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}