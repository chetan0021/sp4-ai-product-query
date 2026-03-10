# Implementation Plan: SP4 Branding & Security

## Goal
Secure the API key using Vercel Serverless Functions and redesign the UI to match the professional, minimalist aesthetic of the SP4 Ameya website.

#### [MODIFY] [api/chat.js](file:///c:/Users/Chetan/Documents/sp4chat/api/chat.js)
- Refine the system prompt to be more conversational and "smart."
- Instruct the AI to handle greetings naturally while keeping product knowledge as its core.
- Add instructions to suggest WhatsApp enquiry for specific product interests.

#### [MODIFY] [index.html](file:///c:/Users/Chetan/Documents/sp4chat/index.html)
- **UI Refresh**:
    - Change body background to a soft cream (`#FDFBF7`).
    - Update message bubble text to be darker (`#2D3748`) and slightly heavier font-weight (`500`).
    - Add a "Contact on WhatsApp" button in the AI responses or sidebar.
    - Improve layout spacing for a more "premium" feel.
- **Logic**:
    - Update `appendMsg` to handle potential HTML/Links better.

#### [MODIFY] [README.md](file:///c:/Users/Chetan/Documents/sp4chat/README.md)
- Add instructions on adding `GROQ_API_KEY` to Vercel Environment Variables.

## Verification Plan
1. **Local Test**: Verify the new UI layout.
2. **Deployment Test**: Once pushed to GitHub, verify that the `/api/chat` route works on Vercel (requires setting the env var).
