# 📺 Best-of Playlist Ranker (Personal Use)

> Feed me a **YouTube playlist link**, get back the **best videos** ranked and listed in **ascending order** (e.g., least → most “best”).  
> Works with either **YouTube Data API v3** or **no-API scraping via `yt-dlp`**. Exports to **CSV/JSON/Markdown**.

---

## ✨ What it does

- Pulls all videos from a YouTube playlist (public/unlisted; private requires cookies).
- Scores each video using a configurable formula (views, likes, recency, duration, etc.).
- Outputs a sorted list **ascending** by “best score” (so #1 is the least best → last is the top banger).
- Exports results to `out/playlist-best.{csv,json,md}` for your personal stash.

> **Note:** “Best” is subjective. You can tweak the scoring to match your vibe.

---

## 🧮 Default “Best” Score (editable)

```txt
score = w_views * log10(views+1)
      + w_likes * log10(likes+1)
      + w_eng   * (likes / max(1, views))
      + w_rec   * recency_boost
