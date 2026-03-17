# ⚡ Ollama Quick Start

## 🚀 5-Minute Setup

### 1. Install Ollama (Windows)
```powershell
iwr -useb get.ollama.ai | iex
```

### 2. Download Thai Model
```bash
ollama pull qwen2.5:7b
```

### 3. Enable Ollama
Edit `frontend/.env.local`:
```env
OLLAMA_ENABLED=true
OLLAMA_MODEL=qwen2.5:7b
```

### 4. Restart Server
```bash
cd frontend
npm run dev
```

### 5. Test!
Open http://localhost:3000, click AI chat, ask:
```
ไม้โครงสนราคาเท่าไหร่
```

---

## 🎯 Model Options

| Model | Thai | English | Size | Speed |
|-------|------|---------|------|-------|
| **qwen2.5:7b** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 4.7GB | Fast |
| **llama3.1:8b** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 4.7GB | Fast |
| **mistral:7b** | ⭐⭐⭐ | ⭐⭐⭐⭐ | 4.1GB | Very Fast |

---

## 🔧 Common Commands

```bash
# Check Ollama is running
ollama --version

# List installed models
ollama list

# Test model in CLI
ollama run qwen2.5:7b "สวัสดี"

# Check server status
curl http://localhost:11434/api/tags

# Download new model
ollama pull llama3.1:8b
```

---

## ⚙️ Switch Models

Edit `frontend/.env.local`:
```env
OLLAMA_MODEL=qwen2.5:7b  # Thai focus
OLLAMA_MODEL=llama3.1:8b # English focus
OLLAMA_MODEL=mistral:7b  # Speed focus
```

Restart server after changing.

---

## 🔄 Fallback to Gemini

If Ollama fails, system uses Google Gemini automatically.

Disable Ollama:
```env
OLLAMA_ENABLED=false
```

---

## 📊 Performance

| RAM | Recommended Model |
|-----|------------------|
| 8GB | qwen2.5:3b (2GB) |
| 16GB | qwen2.5:7b (4.7GB) |
| 32GB+ | qwen2.5:14b (9GB) |

---

## 🆘 Troubleshooting

**Not working?**
```bash
# 1. Check Ollama is running
netstat -ano | findstr :11434

# 2. Test Ollama directly
ollama run qwen2.5:7b "test"

# 3. Check server logs for "🏠 Using Ollama"
```

**Need help?** See full guide: `docs/ollama-setup-guide.md`

---

## ✅ Checklist

- [ ] Install Ollama
- [ ] Download model (qwen2.5:7b)
- [ ] Enable Ollama in .env.local
- [ ] Restart dev server
- [ ] Test in browser
- [ ] Check console for "🏠 Using Ollama"

---

**Done! 🎉**

Your AI chatbot now uses free local models with excellent Thai support!
