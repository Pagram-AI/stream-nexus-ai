## Issues Found

**1. Critical: Node agent reports never reach the database**

The `node-stats` edge function requires `?wallet=<addr>&action=report` in the query string to insert performance rows. The Python agent (`public/pgrm_node_agent.py`) instead POSTs to the bare URL and puts `wallet_address` in the JSON body. Result: the function falls into the GET branch, which calls `req.json()` is never run — but more importantly, no insert happens and the dashboard stays empty.

**2. Agent only reports hardware — no tasks or earnings**

The previous turn's suggestion was to add task execution. Currently the agent never hits `report-task` or `report-earnings`, so the dashboard's task feed and earnings chart never populate from a real node.

**3. Minor: agent has no graceful exit on KeyboardInterrupt during sleep**

`time.sleep` outside the try block means Ctrl+C during the wait prints a traceback instead of the clean stop message.

## Fixes

### A. Fix agent → backend contract (`public/pgrm_node_agent.py`)
- Build the report URL as `${API_URL}?wallet=${wallet}&action=report`
- Remove `wallet_address` from the JSON body (it's now in the query string, matching what the edge function reads)
- Move `time.sleep` inside the try/except so KeyboardInterrupt exits cleanly

### B. Add lightweight task simulation loop to the agent
Add an opt-in `--simulate-tasks` flag. When enabled, every report cycle the agent also:
- POSTs a synthetic task to `?wallet=...&action=report-task` with a random `task_type` (`inference`, `training`, `embedding`), a `TASK-<timestamp>` ref, and `status: completed` (occasionally `failed` to exercise the failure path)
- POSTs earnings to `?wallet=...&action=report-earnings` with a small random PGRM amount and `task_count: 1`

This keeps the agent honest (real hardware metrics are still primary) while letting operators see the dashboard light up end-to-end. Documented as a demo/testing flag, not production behavior.

### C. Update docs
- `public/NODE_AGENT_README.md`: add `--simulate-tasks` to the options table and a short "Demo mode" section
- `src/pages/RunNode.tsx` and `src/pages/Documentation.tsx`: mention the new flag in the Python Agent section command examples

## Out of scope
- No DB schema changes (existing tables already accept these inserts)
- No edge function changes (the contract is fine; the agent was wrong)
- Wallet-registration check in the agent — the edge function's RLS already accepts inserts for any wallet string; adding a pre-check would require a new endpoint
