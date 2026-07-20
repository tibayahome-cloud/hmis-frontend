"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { AI_TOOLS, AI_RESULT } from "@/lib/mock-data";

type Mode = "overview" | "analysis" | "plan";

const MODE_KEY: Record<Mode, keyof typeof AI_RESULT> = {
  overview: "overview",
  analysis: "analysis",
  plan: "plan",
};

export default function AiHelpPage() {
  const [mode, setMode] = useState<Mode>("overview");
  const [query, setQuery] = useState("Summarize Amina Said");
  const [answer, setAnswer] = useState<string | string[]>(AI_RESULT.overview);
  const [busy, setBusy] = useState(false);

  const currentTitle =
    mode === "overview" ? "Patient overview" : mode === "analysis" ? "Image analysis" : "Treatment plan";

  function run(next: Mode, q: string) {
    setMode(next);
    setBusy(true);
    // simulates a call to the AI backend; swap for fetch(api.ai...) later
    setTimeout(() => {
      const raw = AI_RESULT[MODE_KEY[next]];
      setAnswer(raw);
      setBusy(false);
    }, 480);
  }

  return (
    <>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>AI Help</h3>
              <p className="text-subtitle text-muted">
                Patient overview, image analysis, and treatment planning.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="card reveal">
            <div className="card-header">
              <h4>Tools</h4>
            </div>
            <div className="card-body">
              {AI_TOOLS.map((t) => {
                const m = t.title.toLowerCase().includes("overview")
                  ? "overview"
                  : t.title.toLowerCase().includes("image")
                    ? "analysis"
                    : "plan";
                const active = m === mode;
                return (
                  <div
                    key={t.title}
                    onClick={() => run(m as Mode, query)}
                    className={`d-flex align-items-center gap-3 p-3 mb-2 rounded cursor-pointer ${
                      active ? "bg-light-primary" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      border: active ? "1px solid var(--bs-primary)" : "1px solid var(--card-border)",
                      background: active ? "#eef1fd" : "#fff",
                    }}
                  >
                    <div
                      className="stats-icon blue"
                      style={{ width: 40, height: 40, float: "none" }}
                    >
                      <Icon name={t.icon} size={20} />
                    </div>
                    <div>
                      <div className="font-bold">{t.title}</div>
                      <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                        {t.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card reveal" style={{ ["--d" as string]: "120ms" }}>
            <div className="card-header">
              <h4>{currentTitle}</h4>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2 mb-3">
                <input
                  className="form-control"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run(mode, query)}
                  placeholder="Ask about a patient..."
                />
                <button className="btn btn-primary" disabled={busy} onClick={() => run(mode, query)}>
                  {busy ? "Running..." : "Run"}
                </button>
              </div>

              <div
                className="border rounded p-4"
                style={{ borderColor: "var(--bs-primary)", background: "#f7f9ff", minHeight: 160 }}
              >
                {busy ? (
                  <div className="text-muted">Thinking...</div>
                ) : Array.isArray(answer) ? (
                  <ul className="mb-0">
                    {answer.map((line, i) => (
                      <li key={i} className="mb-2">
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-0" style={{ lineHeight: 1.6 }}>
                    {answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
