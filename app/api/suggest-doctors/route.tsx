// import { AIDoctorAgents } from "@/shared/list";
// import { openai } from "@/config/OpenAiModel";
// import { NextResponse, type NextRequest } from "next/server";

// export async function POST(req: NextRequest) {

//     const { notes } = await req.json();
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "google/gemma-3-4b-it:free",
//             messages: [
//                 { role: "system", content: JSON.stringify(AIDoctorAgents) },
//                 { role: "user", content: "User Notes/Symptoms:" + notes + ".Depends on user notes and symptoms, Please suggest List of doctors, Return Object in JSON only" }
//             ],
//         })

//         const rawResp = completion.choices[0].message;
//         return NextResponse.json(rawResp);
//     } catch (e) {
//         return NextResponse.json(e)
//     }
// }

import { AIDoctorAgents } from "@/shared/list";
import { openai } from "@/config/OpenAiModel";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const { notes } = await req.json();
    try {
        const completion = await openai.chat.completions.create({
  model: "google/gemma-3-4b-it:free",
 messages: [
  {
    role: "user",
    content:
      "Here is a list of AI doctor agents: " +
      JSON.stringify(AIDoctorAgents) +
      ". User Notes/Symptoms: " +
      notes +
      ". Based on the user notes and symptoms, please suggest a list of doctors. " +
      "For each doctor, return a JSON object with these fields: " +
      "agentPrompt,id,description, specialist, image (URL of doctor image). " +
      "Return the result as a valid JSON array only, no extra text or markdown."
  },
],

});

        const rawResp = completion.choices[0].message;
        //@ts-ignore
        const Resp = rawResp&&rawResp.content.trim().replace("```json", "").replace("```", "");
        const JSONResp=JSON.parse(Resp);
        return NextResponse.json(JSONResp);
        
    } catch (e) {
        return NextResponse.json(e)
    }
}
