let currentAudio = null;
const autoVoiceQueue = [];
let isProcessingQueue = false;

async function synthesize(text, languageCode) {
  const apiKey = import.meta.env.VITE_SARVAM_API_KEY;

  if (!apiKey) {
    console.error('Text-to-speech requires VITE_SARVAM_API_KEY in the environment.');
    return null;
  }

  try {
    let finalText = text;

    // 1. If Tamil is selected, translate the English text to pure Tamil script first
    if (languageCode === 'ta-IN') {
      const transResponse = await fetch('https://api.sarvam.ai/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': apiKey
        },
        body: JSON.stringify({
          input: text,
          source_language_code: 'en-IN',
          target_language_code: 'ta-IN',
          speaker_gender: 'Male',
          mode: 'formal',
          model: 'mayura:v1'
        })
      });

      if (transResponse.ok) {
        const transData = await transResponse.json();
        finalText = transData.translated_text;
      } else {
        console.error('Translation failed, falling back to English text.');
      }
    }

    // 2. Send the pure text (English or Tamil script) to the TTS engine
    const ttsResponse = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey
      },
      body: JSON.stringify({
        text: finalText,
        language_code: languageCode,
        model: 'bulbul:v3',
        speaker: 'shubh'
      })
    });

    if (!ttsResponse.ok) {
      const err = await ttsResponse.json();
      throw new Error(err.error || `HTTP ${ttsResponse.status}`);
    }

    const data = await ttsResponse.json();
    return new Audio(`data:audio/wav;base64,${data.audios[0]}`);
  } catch (error) {
    console.error('Sarvam TTS Error:', error.message);
    return null;
  }
}

// Interrupts anything currently playing (manual/queued) and speaks
// immediately. Used for the per-row 🔊 button.
export async function speak(text, languageCode = 'en-IN') {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  // Clear any pending auto-voice queue too, since the user explicitly
  // asked to hear this one right now.
  autoVoiceQueue.length = 0;

  const audio = await synthesize(text, languageCode);
  if (!audio) return;

  currentAudio = audio;
  await currentAudio.play();
}

// Appends to a sequential queue instead of interrupting - used for
// auto-voice, so multiple detections arriving close together get read
// out one after another rather than talking over each other.
export function queueSpeak(text, languageCode = 'en-IN') {
  autoVoiceQueue.push({ text, languageCode });
  if (!isProcessingQueue) {
    processAutoVoiceQueue();
  }
}

async function processAutoVoiceQueue() {
  isProcessingQueue = true;

  while (autoVoiceQueue.length > 0) {
    const { text, languageCode } = autoVoiceQueue.shift();
    const audio = await synthesize(text, languageCode);
    if (!audio) continue;

    currentAudio = audio;
    await new Promise((resolve) => {
      audio.addEventListener('ended', resolve, { once: true });
      audio.addEventListener('error', resolve, { once: true });
      audio.play().catch((err) => {
        console.error('Auto-voice playback blocked:', err.message);
        resolve();
      });
    });
  }

  isProcessingQueue = false;
}

export function buildDefectSpeech(defect) {
  const typeLabel = defect.type.replace('_', ' ');
  const parts = [`Warning! ${typeLabel} detected.`];

  if (defect.location) parts.push(`Location: ${defect.location}.`);
  if (defect.nearest_landmark)
    parts.push(`Nearest landmark: ${defect.nearest_landmark}. Proceed with caution`);

  return parts.join(' ');
}