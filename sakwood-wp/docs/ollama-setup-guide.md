# 🏠 Ollama Local AI Setup Guide

Complete guide to set up Ollama local AI for SAK WoodWorks chatbot.

## 📋 Table of Contents

1. [Why Ollama?](#why-ollama)
2. [Installation](#installation)
3. [Model Selection](#model-selection)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Why Ollama?

### Benefits
- ✅ **No API costs** - Free forever
- ✅ **Data privacy** - All data stays on your server
- ✅ **Works offline** - No internet connection needed
- ✅ **Thai language support** - Qwen2.5 model excellent for Thai
- ✅ **Fast response** - Local inference, no network latency
- ✅ **Customizable** - Fine-tune models on your product data

### Comparison

| Feature | Ollama (Local) | Google Gemini (Cloud) |
|---------|---------------|----------------------|
| Cost | Free | Free tier, then paid |
| Privacy | 100% private | Data sent to Google |
| Speed | Fast (local) | Medium (network) |
| Thai Support | Excellent (Qwen2.5) | Good |
| Offline | Yes | No |
| Setup | 5 minutes | Already configured |
| Maintenance | Model updates | None |

---

## 🚀 Installation

### Windows

**Option 1: Automatic Installation (Recommended)**
```powershell
# Run in PowerShell as Administrator
iwr -useb get.ollama.ai | iex
```

**Option 2: Manual Installation**
1. Download from: https://ollama.com/download
2. Run the installer
3. Restart terminal

### Verify Installation
```bash
ollama --version
# Should output: ollama version is 0.1.x or higher
```

---

## 🤖 Model Selection

### Recommended Models for Thai + Products

#### **1. Qwen2.5 7B** (⭐ Recommended)
```bash
ollama pull qwen2.5:7b
```
- **Size:** 4.7 GB
- **Thai Support:** ⭐⭐⭐⭐⭐ Excellent
- **English:** ⭐⭐⭐⭐ Very Good
- **Speed:** Fast
- **Best for:** Product recommendations, Thai customer support

#### **2. Llama 3.1 8B**
```bash
ollama pull llama3.1:8b
```
- **Size:** 4.7 GB
- **Thai Support:** ⭐⭐⭐ Good
- **English:** ⭐⭐⭐⭐⭐ Excellent
- **Speed:** Fast
- **Best for:** English customers, technical queries

#### **3. Mistral 7B**
```bash
ollama pull mistral:7b
```
- **Size:** 4.1 GB
- **Thai Support:** ⭐⭐⭐ Good
- **English:** ⭐⭐⭐⭐ Very Good
- **Speed:** Very Fast
- **Best for:** Quick responses, simple queries

### Download Your Chosen Model
```bash
# Download Qwen2.5 7B (recommended for Thai)
ollama pull qwen2.5:7b

# Verify model is installed
ollama list
```

---

## ⚙️ Configuration

### Step 1: Enable Ollama in Frontend

Edit `frontend/.env.local`:
```env
# Enable Ollama (set to 'true' to use local model)
OLLAMA_ENABLED=true

# Ollama server URL (default is correct for local installation)
OLLAMA_BASE_URL=http://localhost:11434

# Model to use
OLLAMA_MODEL=qwen2.5:7b
```

### Step 2: Restart Next.js Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd frontend
npm run dev
```

### Step 3: Verify Configuration

Check the server console logs:
- If Ollama is working: `🏠 Using Ollama (local model)`
- If falling back to Gemini: `☁️ Using Google Gemini (cloud API)`

---

## 🧪 Testing

### Test 1: Ollama CLI
```bash
ollama run qwen2.5:7b "สวัสดี มีสินค้าอะไรบ้าง"
```

### Test 2: Ollama API
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "สวัสดี มีสินค้าอะไรบ้าง"
}'
```

### Test 3: Web Interface
1. Open http://localhost:3000
2. Click AI chat button
3. Ask: "ไม้โครงสนราคาเท่าไหร่"
4. Check response quality and speed

---

## 🔧 Troubleshooting

### Issue: "Ollama is not running"
**Solution:**
```bash
# Start Ollama service
# On Windows: Ollama usually runs as a background service
# Check if it's running:
netstat -ano | findstr :11434

# If not running, start Ollama from Start Menu
```

### Issue: "Model not found"
**Solution:**
```bash
# List available models
ollama list

# If model is missing, download it
ollama pull qwen2.5:7b
```

### Issue: "Connection refused" at localhost:11434
**Solution:**
```bash
# Restart Ollama service
# Windows: Stop and restart Ollama from system tray

# Or restart from terminal:
# 1. Press Ctrl+Shift+Esc to open Task Manager
# 2. Find "ollama" process
# 3. End task
# 4. Start Ollama again from Start Menu
```

### Issue: "Out of memory"
**Solution:**
```bash
# Use a smaller model
ollama pull qwen2.5:3b  # 2GB instead of 4.7GB

# Update .env.local:
OLLAMA_MODEL=qwen2.5:3b
```

### Issue: "Thai language quality is poor"
**Solution:**
```bash
# Use Qwen2.5 instead of Llama or Mistral
ollama pull qwen2.5:7b

# Update .env.local:
OLLAMA_MODEL=qwen2.5:7b
```

### Issue: "Responses are slow"
**Solution:**
```bash
# Use a smaller/faster model
ollama pull mistral:7b  # Faster than Qwen2.5

# Or use quantized version
ollama pull qwen2.5:7b-q4_0  # Smaller, faster

# Update .env.local:
OLLAMA_MODEL=qwen2.5:7b-q4_0
```

---

## 📊 Performance Tips

### For Best Performance:
1. **Use SSD** for model storage (Ollama uses `~/.ollama/models`)
2. **Close other apps** when using large models
3. **Use appropriate model size:**
   - 8GB RAM: Use 3B models
   - 16GB RAM: Use 7B models
   - 32GB+ RAM: Use 14B+ models

### Monitor Performance:
```bash
# Check Ollama logs
# Windows: %APPDATA%\Ollama\logs

# Check model size
ollama list

# Test inference speed
time ollama run qwen2.5:7b "test"
```

---

## 🔄 Switching Between Models

Easy to switch models in `.env.local`:
```env
# Use different model for different needs
OLLAMA_MODEL=qwen2.5:7b    # Thai support
OLLAMA_MODEL=llama3.1:8b   # English support
OLLAMA_MODEL=mistral:7b    # Speed
```

No code changes needed!

---

## 🌐 Production Deployment

### Docker Setup
Add to `docker-compose.yml`:
```yaml
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama/models
    environment:
      - OLLAMA_MODEL=qwen2.5:7b

volumes:
  ollama_models:
```

### Production Environment Variables
```env
# Production .env
OLLAMA_ENABLED=true
OLLAMA_BASE_URL=http://ollama:11434  # Docker service name
OLLAMA_MODEL=qwen2.5:7b
```

---

## 📚 Resources

- **Ollama Website:** https://ollama.com
- **Model Library:** https://ollama.com/library
- **API Documentation:** https://github.com/ollama/ollama/blob/main/docs/api.md
- **Qwen Models:** https://ollama.com/library/qwen2.5

---

## ❓ FAQ

**Q: Can I use multiple models?**
A: Yes! Switch between them in `.env.local` or create multiple API endpoints.

**Q: How much RAM do I need?**
A: Minimum 8GB for 7B models, 16GB recommended for smooth operation.

**Q: Can I fine-tune models on my product data?**
A: Yes! Ollama supports fine-tuning. This would make the AI even better at your specific products.

**Q: What happens if Ollama goes down?**
A: The system automatically falls back to Google Gemini if available.

**Q: Can I use Ollama in production?**
A: Yes! Many companies use Ollama in production. Just ensure your server has enough RAM.

---

## 🎉 Summary

1. **Install Ollama:** `iwr -useb get.ollama.ai | iex`
2. **Download model:** `ollama pull qwen2.5:7b`
3. **Enable in .env.local:** `OLLAMA_ENABLED=true`
4. **Restart dev server:** `npm run dev`
5. **Test:** Open browser, click AI chat, ask questions!

**Total time:** ~5-10 minutes (including model download)

**Total cost:** Free 💰

---

Need help? Check the [Troubleshooting](#troubleshooting) section or visit https://ollama.com
