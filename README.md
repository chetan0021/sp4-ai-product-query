# SP4 AI Product Assistant (Official Branding)

An intelligent AI chatbot tailored for SP4 Ameya's product portfolio. This version features a secure backend and matches the official SP4 website aesthetics.

## ✨ Features
- **Official Branding**: Design inspired by `sp4ameya.com` (Dark Purple & Burnt Orange).
- **Secure Architecture**: API keys are handled server-side via Vercel Edge Functions.
- **Dynamic Catalog**: Loads products from `products.json`.
- **Clean UI**: Minimalist, professional interface for healthcare professionals.

## 🛠️ Setup & Deployment

### 1. Vercel Deployment
1. Push this code to your GitHub repository.
2. Link the repository to [Vercel](https://vercel.com).
3. **CRITICAL**: Go to **Project Settings > Environment Variables** in Vercel.
4. Add a new variable:
   - **Key**: `GROQ_API_KEY`
   - **Value**: `PASTE_YOUR_GROQ_KEY_HERE` (Starts with `gsk_`)
5. Redeploy the project.

### 2. Why is this more secure?
- Your API key is **never** sent to the user's browser.
- All AI communication happens on Vercel's servers.
- Users cannot steal or copy your key from the source code.

## 📁 Project Structure
- `index.html`: Main UI with SP4 brand styles.
- `api/chat.js`: Secure server-side function for AI processing.
- `products.json`: Product metadata.
