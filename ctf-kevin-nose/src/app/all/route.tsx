import { NextRequest } from "next/server";
import questions from "@/questions";

export async function GET(req: NextRequest) {
    try {
        var a = (req.nextUrl.searchParams.get("a") as string).split(",");

        for (var i = 0; i < questions.length; i++) {
            if (
                questions[i].answer.toLowerCase() != a[i].toLowerCase().trim()
            ) {
                return Response.json({ ok: false });
            }
        }

        return Response.json({ ok: true, flag: "blu{now_you_nose}" });
    } catch (e) {
        return Response.json({ ok: false });
    }
}
