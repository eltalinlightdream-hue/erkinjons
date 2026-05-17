This is a large multi-feature update. Below is the plan I'll execute. Approve to proceed.

## 1. Database (single migration)
New tables (all RLS-protected, user-scoped):
- `vocabulary_folders` (id, user_id, name, created_at) — default "General" folder auto-created via trigger on new user
- `vocabulary_words` (id, user_id, folder_id, word, definition, example, next_review, interval, ease_factor, created_at)
- `test_results` (id, user_id, passage_title, score, total, band, completed_at)
- `articles_read` (id, user_id, article_slug, read_at)
- `bookmarks` (id, user_id, type, reference_id, created_at)
- `passage_notes` (id, user_id, passage_id, notes, updated_at) — unique (user_id, passage_id)

Plus update `handle_new_user` trigger to seed "General" folder.

## 2. Navigation (src/components/site-layout.tsx)
- Replace nav with: Home | Practice ▾ | Video Lessons | Articles | Contact & About
- Practice = hover dropdown (Radix NavigationMenu or custom hover-popover) → Listening, Reading, Writing, Speaking
- Add notification badge showing words due today (queries vocabulary_words for logged-in users)
- Mobile: collapse Practice into expanded section

## 3. New pages
- `/practice` — 4 section cards
- `/contact-about` — merged About + Contact (3 cards: YouTube, Telegram Channel, Personal Telegram)
- `/articles` — grid of cards from hardcoded `ARTICLES` array (2 placeholders)
- `/articles/$slug` — full article + vocabulary cards with "Save to Vocabulary" modal
- `/vocabulary` — folder list + flashcard review + add word + progress

## 4. Updates
- Delete `/contact` and `/about` routes (redirect-by-removal; nav no longer links)
- `/account` — expanded with Profile, Membership, Devices, Stats, Leaderboard, Bookmarks sections
- Reading & Listening passage modals: add collapsible "My Notes" panel + auto-save test_results on Check Answers
- Footer: update Explore + Connect link lists
- Home page: update any links that pointed to /about or /contact

## 5. Server functions (src/lib/)
- `vocabulary.functions.ts` — list folders, create/rename/delete folder, list words, add word (with SM-2-lite scheduling), review card (Again/Hard/Good/Easy), due-count
- `articles.functions.ts` — record read, save vocab from article
- `tests.functions.ts` — record test result, get user stats, weekly leaderboard
- `notes.functions.ts` — get/upsert passage notes
- `bookmarks.functions.ts` — list/toggle bookmark
- `profile.functions.ts` — update full_name, change password

## 6. Components
- `<NotesPanel passageId>` — collapsible, autosave on blur
- `<SaveVocabModal>` — folder picker for article words
- `<ActivityHeatmap>` — simple grid based on activity counts
- Stats bar chart via Recharts (already in deps if present, else add)

## 7. Scope notes
- "Articles" content stays hardcoded (array of objects in `src/lib/articles-data.ts`)
- Reading/Listening passage UIs preserved; only adding Notes panel + result auto-save
- Spaced repetition uses simple SM-2-lite: Again→0d, Hard→1d, Good→interval*ease, Easy→interval*ease*1.3
- Leaderboard derived live from `test_results` aggregated for current ISO week

Will execute the migration first (requires your approval), then implement everything in one batch.