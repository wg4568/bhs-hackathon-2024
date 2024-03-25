import { NextRequest } from "next/server";
import questions from "@/questions";

export async function GET(req: NextRequest) {
    try {
        var q = parseInt(req.nextUrl.searchParams.get("q") as string);
        var a = (req.nextUrl.searchParams.get("a") as string)
            .toLowerCase()
            .trim();

        return Response.json({ ok: questions[q].answer.toLowerCase() == a });
    } catch (e) {
        return Response.json({ ok: false });
    }
}
