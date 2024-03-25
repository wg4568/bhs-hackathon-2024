"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";

type QuestionProps = {
    idx: number;
    question: string;
    onCorrect: (idx: number, answer: string) => void;
};

function Question(props: QuestionProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [correct, setCorrect] = useState(false);

    function checkQuestion() {
        if (!inputRef.current) return;

        let val = inputRef.current.value;

        fetch(`/qna?q=${props.idx}&a=${val}`)
            .then((r) => r.json())
            .then((d) => {
                if (d.ok) {
                    setCorrect(true);
                    props.onCorrect(props.idx, val);
                } else {
                    setCorrect(false);
                }
            });
    }

    return (
        <div className={styles.question}>
            <p>{props.question}</p>

            <div className={styles.answerBox}>
                <input
                    className={correct ? styles.correct : ""}
                    ref={inputRef}
                    onChange={checkQuestion}
                    type="text"
                    placeholder="Enter your answer"
                    disabled={correct}
                />
                {correct && <span>Correct!</span>}
            </div>
        </div>
    );
}

function Popup(props: { flag: string }) {
    return (
        <div className={styles.popup}>
            <div>
                <h1>{props.flag}</h1>
            </div>
        </div>
    );
}

export default function Home() {
    const [questions, setQuestions] = useState([]);
    const answers = useRef<{ [key: number]: string }>({});
    const [flag, setFlag] = useState("");

    useEffect(() => {
        fetch("/qns")
            .then((r) => r.json())
            .then((d) => {
                setQuestions(d);
            });
    }, []);

    function onCorrect(idx: number, answer: string) {
        if (!answers.current) return;

        answers.current[idx] = answer;

        var allIn = true;
        var ordered = [];
        for (let i = 0; i < questions.length; i++) {
            if (!answers.current[i]) allIn = false;
            else ordered.push(answers.current[i]);
        }

        if (allIn) {
            fetch(`/all?a=${ordered.join(",")}`)
                .then((r) => r.json())
                .then((d) => {
                    console.log(d);
                    setFlag(d.flag);
                });
        }
    }

    return (
        <main>
            {questions.map((qn, idx) => (
                <Question
                    key={idx}
                    idx={idx}
                    question={qn}
                    onCorrect={onCorrect}
                />
            ))}

            {flag != "" && <Popup flag={flag} />}
        </main>
    );
}
