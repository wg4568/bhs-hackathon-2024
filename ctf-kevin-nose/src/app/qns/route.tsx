import { NextRequest } from "next/server";
import questions from "@/questions";

export async function GET() {
    return Response.json(questions.map((qn) => qn.question));
}
