import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collectPosts } from "../services/api";
import { motion } from "framer-motion";
import DateTimeFilter from "../components/DateTimeFilter";


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
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [limit, setLimit] = useState(50);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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
      // Call backend to collect posts
      const data = await collectPosts({
        query: session.query,
        platform,
        limit: session.limit,
        from,
        to,
      });
      setRows(data);
      // Persist collected posts to localStorage
      try {
        localStorage.setItem("latestCollectedPosts", JSON.stringify(data));
      } catch (e) { /* ignore */ }
      setProgress(100);
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
    <div className="relative min-h-screen p-0 md:p-8 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-300/30 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      <h1 className="z-10 text-3xl md:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 drop-shadow-lg">Data Collection</h1>

      {/* Form Card */}
      <motion.div
        className="z-10 w-full max-w-5xl bg-gradient-to-br from-purple-100 via-blue-50 to-white/80 border border-purple-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-2">Collect Public Posts</h2>
        <p className="text-gray-500 mb-4">
          Search publicly available posts (no private data). Use filters to refine your collection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
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
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date/Time Filter</label>
            <DateTimeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={startCollection}
            disabled={!canStart}
            className={`px-6 py-2 rounded-xl text-white font-semibold shadow transition ${
              canStart ? "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {status === "collecting" ? "Collecting…" : "Start Collection"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearAll}
            className="px-6 py-2 rounded-xl border text-gray-700 font-semibold shadow hover:bg-gray-50"
          >
            Clear Data
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (rows.length) {
                try {
                  localStorage.setItem("latestCollectedPosts", JSON.stringify(rows));
                } catch (e) { /* ignore */ }
                navigate("/sentiment-analysis", { state: { posts: rows } });
              }
            }}
            disabled={!rows.length}
            className={`px-6 py-2 rounded-xl text-white font-semibold shadow transition ${
              rows.length ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:to-blue-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Analyze Sentiment
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (rows.length) {
                try {
                  localStorage.setItem("latestCollectedPosts", JSON.stringify(rows));
                } catch (e) { /* ignore */ }
                navigate("/dashboard", { state: { posts: rows } });
              }
            }}
            disabled={!rows.length}
            className={`px-6 py-2 rounded-xl text-white font-semibold shadow transition ${
              rows.length ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:to-purple-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            View in Dashboard
          </motion.button>
        </div>
      </motion.div>

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
      <motion.div
        className="z-10 w-full max-w-6xl bg-gradient-to-br from-blue-100 via-purple-50 to-white/80 border border-blue-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-blue-700">Collected Data Overview</h3>
          <span className="text-sm text-gray-500">Showing {rows.length} records</span>
        </div>

        <div className="overflow-auto border rounded-xl">
          <table className="min-w-[960px] w-full">
            <thead className="bg-blue-50 text-sm">
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

              {rows
                .filter(r => {
                  // Filter by date/time if set
                  if (!from && !to) return true;
                  const ts = new Date(r.timestamp).getTime();
                  const fromTs = from ? new Date(from).getTime() : -Infinity;
                  const toTs = to ? new Date(to).getTime() : Infinity;
                  return ts >= fromTs && ts <= toTs;
                })
                .map((r, idx) => (
                  <tr key={idx} className="border-t hover:bg-blue-50">
                    <td className="p-3 font-medium text-gray-800">@{r.user}</td>
                    <td className="p-3 text-gray-600">{r.timestamp}</td>
                    <td className="p-3 text-gray-700">
                      <span className="inline-block max-w-xl truncate" title={r.content}>
                        {r.content}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700 whitespace-nowrap">
                      <span className="text-pink-500">❤️ {r.engagement.likes}</span> &nbsp;•&nbsp; <span className="text-blue-500">🔁 {r.engagement.shares}</span> &nbsp;•&nbsp; <span className="text-green-500">💬 {r.engagement.comments}</span>
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
          Hash is computed from platform, query, user, timestamp, content, engagement, and URL to help preserve evidence integrity.
        </div>
      </motion.div>
    </div>
  );
}
