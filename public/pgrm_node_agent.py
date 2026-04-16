#!/usr/bin/env python3
"""
PGRM Node Agent — Reports real hardware metrics to the Pagram AI network.

Usage:
    python pgrm_node_agent.py --wallet <YOUR_WALLET_ADDRESS>

Requirements:
    pip install -r requirements.txt
"""

import argparse
import json
import time
import platform
import urllib.request
import urllib.error

try:
    import psutil
except ImportError:
    print("ERROR: psutil is required. Install it with: pip install psutil")
    exit(1)

try:
    import GPUtil
    GPU_AVAILABLE = True
except ImportError:
    GPU_AVAILABLE = False

# ── Configuration ────────────────────────────────────────────────────────────
API_URL = "https://nsrstbjhviwdiwtdrsoo.supabase.co/functions/v1/node-stats"
API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcnN0Ympodml3ZGl3dGRyc29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDk4NjUsImV4cCI6MjA5MTcyNTg2NX0.a1eoSsKE8Mfj_fs0Jkr_AVG4_IZoveNSKocxtKT17Jg"
REPORT_INTERVAL = 30  # seconds


def collect_metrics():
    """Collect real hardware metrics from the host machine."""
    cpu_usage = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    gpu_usage = 0.0
    gpu_temp = 0.0

    if GPU_AVAILABLE:
        gpus = GPUtil.getGPUs()
        if gpus:
            gpu = gpus[0]
            gpu_usage = gpu.load * 100
            gpu_temp = gpu.temperature

    return {
        "cpu_usage": round(cpu_usage, 1),
        "memory_usage": round(memory.percent, 1),
        "gpu_usage": round(gpu_usage, 1),
        "gpu_temp": round(gpu_temp, 1),
        "disk_used_gb": round(disk.used / (1024 ** 3), 1),
        "disk_total_gb": round(disk.total / (1024 ** 3), 1),
        "is_online": True,
    }


def send_report(wallet_address: str, metrics: dict):
    """Send metrics to the PGRM backend."""
    payload = json.dumps({
        "wallet_address": wallet_address,
        **metrics,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "apikey": API_KEY,
            "Authorization": f"Bearer {API_KEY}",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode()
            print(f"[OK] Reported → CPU {metrics['cpu_usage']}% | "
                  f"MEM {metrics['memory_usage']}% | "
                  f"GPU {metrics['gpu_usage']}% @ {metrics['gpu_temp']}°C")
    except urllib.error.HTTPError as e:
        print(f"[ERR] HTTP {e.code}: {e.read().decode()}")
    except Exception as e:
        print(f"[ERR] {e}")


def main():
    parser = argparse.ArgumentParser(description="PGRM Node Agent")
    parser.add_argument("--wallet", required=True, help="Your registered wallet address")
    parser.add_argument("--interval", type=int, default=REPORT_INTERVAL, help="Report interval in seconds (default: 30)")
    args = parser.parse_args()

    wallet = args.wallet.strip().lower()

    print(f"""
╔══════════════════════════════════════════════╗
║          PGRM Node Agent v1.0.0              ║
╠══════════════════════════════════════════════╣
║  Wallet : {wallet[:10]}...{wallet[-6:]}
║  OS     : {platform.system()} {platform.release()}
║  GPU    : {'Detected' if GPU_AVAILABLE else 'Not detected (install GPUtil)'}
║  Report : Every {args.interval}s
╚══════════════════════════════════════════════╝
""")

    while True:
        try:
            metrics = collect_metrics()
            send_report(wallet, metrics)
        except KeyboardInterrupt:
            print("\n[STOP] Agent stopped.")
            break
        except Exception as e:
            print(f"[ERR] {e}")

        time.sleep(args.interval)


if __name__ == "__main__":
    main()
