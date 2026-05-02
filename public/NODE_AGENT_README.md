# PGRM Node Agent

A lightweight Python agent that reports real hardware metrics (CPU, memory, GPU, disk) from your machine to the Pagram AI network every 30 seconds.

## Requirements

- Python 3.8+
- NVIDIA GPU with drivers installed (optional but recommended)
- A registered PGRM wallet address

## Quick Start

```bash
# 1. Download the agent and requirements
curl -O https://pgrm.network/pgrm_node_agent.py
curl -O https://pgrm.network/requirements.txt

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the agent
python pgrm_node_agent.py --wallet <YOUR_WALLET_ADDRESS>
```

## Options

| Flag                | Description                                              | Default  |
|---------------------|----------------------------------------------------------|----------|
| `--wallet`          | Your registered wallet address                           | Required |
| `--interval`        | Report interval in seconds                               | 30       |
| `--simulate-tasks`  | Demo mode: also report synthetic tasks + earnings        | Off      |

## Example

```bash
python pgrm_node_agent.py --wallet 0x1234abcd...5678ef --interval 60
```

## Demo Mode

To see your dashboard light up end-to-end without waiting for real network tasks, enable simulation:

```bash
python pgrm_node_agent.py --wallet 0x1234abcd...5678ef --simulate-tasks
```

Every cycle the agent will additionally report a synthetic task (inference / training / embedding) and a small PGRM earnings entry. Real hardware metrics are still reported as normal. Use this for testing only.

## What It Reports

- **CPU Usage** — Current processor utilisation (%)
- **Memory Usage** — RAM utilisation (%)
- **GPU Usage** — NVIDIA GPU load (%) — requires GPUtil
- **GPU Temperature** — Current GPU temp (°C)
- **Disk Usage** — Used / Total disk space (GB)
- **Online Status** — Node availability flag

## Running as a Background Service

### Using systemd (Linux)

```bash
sudo tee /etc/systemd/system/pgrm-agent.service << 'EOF'
[Unit]
Description=PGRM Node Agent
After=network.target

[Service]
Type=simple
User=your-username
ExecStart=/usr/bin/python3 /opt/pgrm/pgrm_node_agent.py --wallet YOUR_WALLET_ADDRESS
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable pgrm-agent
sudo systemctl start pgrm-agent
```

### Using screen / tmux

```bash
screen -dmS pgrm-agent python pgrm_node_agent.py --wallet YOUR_WALLET_ADDRESS
```

## Troubleshooting

| Issue | Solution |
|-------|---------|
| `ModuleNotFoundError: psutil` | Run `pip install psutil` |
| GPU shows 0% | Install GPUtil: `pip install GPUtil` and ensure NVIDIA drivers are installed |
| HTTP 400 error | Ensure your wallet is registered at https://pgrm.network/run-node |
| Connection refused | Check your internet connection and firewall settings |

## License

MIT — Pagram AI
