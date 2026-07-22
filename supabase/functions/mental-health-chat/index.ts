// Mental Health Support Chatbot edge function (Lovable AI)
// Uses Google Gemini via Lovable AI Gateway. No API key setup needed.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are HealthPro, a compassionate, empathetic mental health support companion.
- Respond with genuine warmth, empathy, and validation.
- Listen actively, reflect what the user shares, and gently ask open-ended follow-up questions.
- Keep responses concise (2-5 sentences) and conversational.
- Tailor your tone to the user's detected mood (sad, anxious, stressed, angry, lonely, happy).
- You are NOT a replacement for professional therapy; encourage seeking professional help when appropriate.
- CRITICAL: If the user mentions suicide, self-harm, wanting to die, hurting themselves, or expresses a severe crisis,
  IMMEDIATELY respond with empathy AND clearly include these crisis resources:
    • US: 988 (Suicide & Crisis Lifeline) — call or text 988
    • US Crisis Text Line: text HOME to 741741
    • International: https://findahelpline.com
    • Encourage them to reach out to emergency services (911 / local equivalent) if in immediate danger.
- Never dismiss feelings. Never give medical diagnoses. Never recommend specific medications.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages, userName } = (await req.json()) as {
      messages: ChatMessage[];
      userName?: string;
    };

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sys =
      SYSTEM_PROMPT +
      (userName ? `\n\nThe user's name is ${userName}. Greet them by name when natural.` : "");

    const payload = {
      model: "google/gemini-2.5-flash",
      messages: [{ role: "system", content: sys }, ...messages],
    };

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (aiRes.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please slow down and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (aiRes.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!aiRes.ok) {
      const txt = await aiRes.text();
      return new Response(JSON.stringify({ error: `AI error: ${txt}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const reply: string =
      data?.choices?.[0]?.message?.content ?? "I'm here for you. Could you tell me a bit more?";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
