
## Meeting Summarizer App Front-End
This is a **Next.js** application that allows users to upload meeting audio files, select a base model, and generate a summary using a [backend API](https://github.com/bokal2/meeting-summarizer-backend).

### **Features**
- Upload audio files (`.mp3`) for transcription and summarization.
- Select a base model (e.g., `Amazon Titan`, `GPT-4`, `Whisper`).
- View meeting summaries, sentiment analysis, and key discussion issues.
- Responsive UI with **ShadCN UI** components.

---

## Installation & Setup
### Clone the repository
```sh
git clone https://github.com/bokal2/meeting-summarizer-frontend.git
cd meeting-summarizer-frontend
```

### ** Install dependencies**
```sh
npm install
```

### ** Start the development server**
```sh
npm run dev
```
The app runs on **`http://localhost:3000`**.

---

## **Run with Docker**
### **Build the Docker image**
```sh
docker build -t meeting-summary-app .
```

### **Run the container**
```sh
docker run -p 3000:3000 --name meeting-summary-container meeting-summary-app
```
Your app is now available at **`http://localhost:3000`**.

### **Stop & Remove the Container**
```sh
docker stop meeting-summary-container
docker rm meeting-summary-container
docker rmi meeting-summary-app
```

---

## **API Call**
The app sends a request to the backend:
```sh
curl -X POST "http://127.0.0.1:8000/summary" \
-H "Content-Type: multipart/form-data" \
-F "file=@meeting_audio.mp3" \
-F "model_id=amazon.titan-text-lite-v1"
```
**Example API Response:**
```json
{
  "response": {
    "topic": "Project Updates",
    "meeting_summary": "The meeting discussed progress on the Q1 deliverables...",
    "sentiment": "positive",
    "issues": [
      {
        "topic": "Timeline Delay",
        "summary": "The team noted delays in the design phase."
      }
    ]
  }
}
```

---

## **License**
This project is licensed under the **MIT License**.
