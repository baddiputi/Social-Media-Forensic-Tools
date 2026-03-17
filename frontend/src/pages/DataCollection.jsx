import React, { useMemo, useRef, useState } from "react";

/** ---------- Utilities ---------- **/

// Format Date -> '2025-09-05 14:32:10'
const fmt = (d) =>
  new Date(d).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

// SHA-256 (Web Crypto). Returns hex string.
async function sha256(text) {
  if (window.crypto?.subtle) {
    const enc = new TextEncoder().encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", enc);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback (very rare): simple (non-crypto) hash to avoid blocking UX
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h << 5) - h + text.charCodeAt(i);
    h |= 0;
  }
  return `fallback_${Math.abs(h)}`;
}

// Create & download a file
function downloadBlob(filename, mime, data) {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// CSV escape
function csvEscape(val) {
  const s = String(val ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCSV(rows) {
  const headers = [
    "platform",
    "query",
    "user",
    "timestamp",
    "content",
    "engagement_likes",
    "engagement_shares",
    "engagement_comments",
    "url",
    "hash",
  ];
  const head = headers.join(",");
  const body = rows
    .map((r) =>
      [
        r.platform,
        r.query,
        r.user,
        r.timestamp,
        r.content,
        r.engagement.likes,
        r.engagement.shares,
        r.engagement.comments,
        r.url,
        r.hash,
      ]
        .map(csvEscape)
        .join(",")
    )
    .join("\n");
  return `${head}\n${body}\n`;
}

/** ---------- Mock Generators (for demo) ---------- **/

const SAMPLE_USERS = [
  "alice_dev",
  "bob_research",
  "cyberNinja",
  "threatWatch",
  "forensics_guy",
  "intelQueen",
  "netOps24",
  "secConsult",
  "osint_hunter",
  "riskRadar",
];

const SAMPLE_SNIPPETS = [
  "New vuln spotted in the wild",
  "Anyone else seeing weird login patterns?",
  "Huge spike in phishing attempts today",
  "Staying vigilant — #cybersecurity",
  "Harassment report: user spamming DMs",
  "Possible data leak in that repo",
  "FYI: outage on east region",
  "Trending hashtag looks botted",
  "Love the new patch, stable now",
  "This is concerning, needs review",
];

const PLATFORM_BASE_URL = {
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  reddit: "https://reddit.com",
};

// random int [a,b]
const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// past N days
function randomRecentDate(days = 7) {
  const now = Date.now();
  const past = now - ri(0, days * 24 * 60 * 60 * 1000);
  return new Date(past);
}

function randomEngagement() {
  return {
    likes: ri(0, 500),
    shares: ri(0, 200),
    comments: ri(0, 120),
  };
}

/** ---------- Main Component ---------- **/

export default function DataCollection() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [limit, setLimit] = useState(50);

  const [rows, setRows] = useState([]); // collected rows
  const [status, setStatus] = useState("idle"); // idle | collecting | completed | error
  const [log, setLog] = useState(null); // session log
  const [progress, setProgress] = useState(0);

  const inFlightRef = useRef(false);

  const platformLabel = useMemo(() => {
    switch (platform) {
      case "twitter":
        return "Twitter / X";
      case "instagram":
        return "Instagram";
      case "facebook":
        return "Facebook";
      case "reddit":
        return "Reddit";
      default:
        return platform;
    }
  }, [platform]);

  const canStart = query.trim().length > 0 && !inFlightRef.current;

  const startCollection = async () => {
    if (!canStart) return;

    // Reset
    setRows([]);
    setProgress(0);
    setStatus("collecting");
    inFlightRef.current = true;

    const session = {
      startedAt: new Date().toISOString(),
      platform,
      platformLabel,
      query: query.trim(),
      limit: Number(limit) || 50,
    };
    setLog(session);

    try {
      // Simulate streaming collection (no API keys here).
      const batchSize = 5;
      let collected = [];
      for (let i = 0; i < session.limit; i++) {
        const u = SAMPLE_USERS[ri(0, SAMPLE_USERS.length - 1)];
        const content = `${SAMPLE_SNIPPETS[ri(0, SAMPLE_SNIPPETS.length - 1)]} ${
          Math.random() < 0.5 ? `#${query.replace(/^#/, "")}` : ""
        }`;
        const timestamp = fmt(randomRecentDate(7));
        const engagement = randomEngagement();
        const url = `${PLATFORM_BASE_URL[platform]}/${u}/status/${Date.now()}${ri(100, 999)}`;

        const hashInput = `${platform}|${session.query}|${u}|${timestamp}|${content}|${engagement.likes}|${engagement.shares}|${engagement.comments}|${url}`;
        const hash = await sha256(hashInput);

        collected.push({
          platform,
          query: session.query,
          user: u,
          timestamp,
          content,
          engagement,
          url,
          hash,
        });

        // push in batches to feel "live"
        if (i % batchSize === 0 || i === session.limit - 1) {
          setRows((prev) => [...prev, ...collected]);
          collected = [];
          setProgress(Math.round(((i + 1) / session.limit) * 100));
          await new Promise((r) => setTimeout(r, 150)); // slight delay for UX
        }
      }

      setStatus("completed");
    } catch (e) {
      console.error(e);
      setStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  };

  const clearAll = () => {
    setRows([]);
    setStatus("idle");
    setProgress(0);
    setLog(null);
  };

  /** --------- Exports --------- **/
  const downloadCSV = () => {
    if (!rows.length) return;
    const csv = toCSV(rows);
    downloadBlob(`collection_${platform}_${Date.now()}.csv`, "text/csv;charset=utf-8", csv);
  };

  const downloadJSON = () => {
    if (!rows.length) return;
    downloadBlob(
      `collection_${platform}_${Date.now()}.json`,
      "application/json",
      JSON.stringify(rows, null, 2)
    );
  };

  // Hash Manifest (Line-per-record)
  const downloadHashManifest = () => {
    if (!rows.length) return;
    const lines = rows.map(
      (r, i) =>
        `${(i + 1).toString().padStart(4, "0")}  ${r.hash}  |  ${r.platform}  |  ${r.user}  |  ${r.timestamp}  |  ${r.url}`
    );
    const header = [
      `# Social Media Forensics — Hash Manifest`,
      `# Query: ${log?.query ?? "-"} | Platform: ${log?.platformLabel ?? "-"} | Limit: ${
        log?.limit ?? "-"
      }`,
      `# StartedAt: ${log?.startedAt ?? "-"}`,
      `# Count: ${rows.length}`,
      `# Algorithm: SHA-256`,
      ``,
    ].join("\n");
    downloadBlob(
      `hash_manifest_${platform}_${Date.now()}.sha256.txt`,
      "text/plain;charset=utf-8",
      header + lines.join("\n") + "\n"
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">Data Collection</h1>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Collect Public Posts</h2>
        <p className="text-gray-500">
          Search publicly available posts (no private data). Later we’ll wire this to your backend
          collectors (snscrape/APIs) per platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keyword or Hashtag
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., #cybersecurity or phishing"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="twitter">Twitter / X</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="reddit">Reddit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Post Limit</label>
            <input
              type="number"
              min={1}
              max={500}
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={startCollection}
            disabled={!canStart}
            className={`px-5 py-2 rounded-lg text-white transition ${
              canStart ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {status === "collecting" ? "Collecting…" : "Start Collection"}
          </button>

          <button
            onClick={clearAll}
            className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
          >
            Clear Data
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Collection Status</h3>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
              status === "idle"
                ? "bg-gray-100 text-gray-700"
                : status === "collecting"
                ? "bg-blue-100 text-blue-700"
                : status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                status === "idle"
                  ? "bg-gray-400"
                  : status === "collecting"
                  ? "bg-blue-500 animate-pulse"
                  : status === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>

          {status !== "idle" && (
            <span className="text-sm text-gray-500">
              {log ? (
                <>
                  <b>Query:</b> {log.query} &middot; <b>Platform:</b> {log.platformLabel} &middot;{" "}
                  <b>Limit:</b> {log.limit}
                </>
              ) : (
                "—"
              )}
            </span>
          )}
        </div>

        {/* Progress */}
        {status === "collecting" && (
          <div className="h-3 w-full bg-gray-100 rounded">
            <div
              className="h-3 bg-purple-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Summary */}
        <div className="text-sm text-gray-600">
          <div>
            <b>Started:</b> {log?.startedAt ? fmt(log.startedAt) : "—"}
          </div>
          <div>
            <b>Total Collected:</b> {rows.length}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={downloadCSV}
            disabled={!rows.length}
            className={`px-4 py-2 rounded-lg text-white ${
              rows.length ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Download CSV
          </button>
          <button
            onClick={downloadJSON}
            disabled={!rows.length}
            className={`px-4 py-2 rounded-lg text-white ${
              rows.length ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Download JSON
          </button>
          <button
            onClick={downloadHashManifest}
            disabled={!rows.length}
            className={`px-4 py-2 rounded-lg text-white ${
              rows.length ? "bg-gray-700 hover:bg-black" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Export Hash Manifest
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Collected Data Overview</h3>
          <span className="text-sm text-gray-500">Showing {rows.length} records</span>
        </div>

        <div className="overflow-auto border rounded-xl">
          <table className="min-w-[960px] w-full">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Timestamp</th>
                <th className="text-left p-3">Content</th>
                <th className="text-left p-3">Engagement</th>
                <th className="text-left p-3">URL</th>
                <th className="text-left p-3">Hash (SHA-256)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.length === 0 && (
                <tr>
                  <td className="p-4 text-gray-500" colSpan={6}>
                    No data yet. Start a collection above.
                  </td>
                </tr>
              )}

              {rows.map((r, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">@{r.user}</td>
                  <td className="p-3 text-gray-600">{r.timestamp}</td>
                  <td className="p-3 text-gray-700">
                    <span className="inline-block max-w-xl truncate" title={r.content}>
                      {r.content}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700 whitespace-nowrap">
                    ❤️ {r.engagement.likes} &nbsp;•&nbsp; 🔁 {r.engagement.shares} &nbsp;•&nbsp; 💬{" "}
                    {r.engagement.comments}
                  </td>
                  <td className="p-3">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open
                    </a>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-gray-500 break-all">{r.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Small legend */}
        <div className="text-xs text-gray-500 mt-3">
          Hash is computed from platform, query, user, timestamp, content, engagement, and URL to
          help preserve evidence integrity.
        </div>
      </div>
    </div>
  );
}
