import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

type VibeSeed = {
  id: string;
  name: string;
  tagline: string;
  prompt: string;
  tags: string[];
  modelSupport: string[];
  useCases: string[];
  previewImageUrl: string;
  jsonSchema: Record<string, unknown>;
  related?: string[];
};

async function bootstrapFirebase() {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!credentialsPath) {
    throw new Error(
      'Set GOOGLE_APPLICATION_CREDENTIALS to the path of your Firebase service account JSON file.'
    );
  }

  const resolvedPath = resolve(credentialsPath);
  const fileBuffer = await readFile(resolvedPath, 'utf-8');
  const serviceAccount = JSON.parse(fileBuffer);

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  return getFirestore();
}

const vibeSeeds: VibeSeed[] = [
  {
    id: 'urban-dawn',
    name: 'Urban Dawn',
    tagline: 'Warm cinematic realism as the city yawns awake.',
    prompt:
      'Golden-hour aerial tracking shot of a modern city skyline as the first light hits rooftop gardens. Wide-angle lens, subtle anamorphic flares, soft atmospheric haze, gentle lo-fi beats drifting in the background.',
    tags: ['cinematic', 'realism', 'sunrise', 'cityscape'],
    modelSupport: ['Sora', 'Veo', 'Pika'],
    useCases: ['Mood films', 'Brand openers', 'City tourism'],
    previewImageUrl: '/sample-thumbnails/urban-dawn.jpg',
    jsonSchema: {
      aspect_ratio: '16:9',
      pacing: 'lingering',
      camera: {
        movement: 'slow aerial dolly',
        lens: '28mm anamorphic',
      },
      palette: ['#FEEBC8', '#1A365D', '#F6AD55'],
      soundtrack: {
        tempo: 82,
        instrumentation: ['lo-fi drums', 'warm synth pad'],
      },
    },
    related: ['startup-hustle', 'rainy-cafe'],
  },
  {
    id: 'synthwave-city',
    name: 'Synthwave City',
    tagline: 'Neon futurism pulsing to an 80s beat.',
    prompt:
      'Nighttime drone shot gliding through a retro-futuristic skyline drenched in magenta and cyan neon. Light fog, reflections shimmering on wet streets, synthwave soundtrack building toward a drop.',
    tags: ['neon', 'retro', 'futuristic', 'night'],
    modelSupport: ['Sora', 'Runway'],
    useCases: ['Music videos', 'Fashion campaigns', 'Live event visuals'],
    previewImageUrl: '/sample-thumbnails/synthwave-city.jpg',
    jsonSchema: {
      aspect_ratio: '21:9',
      pacing: 'moderate',
      camera: {
        movement: 'forward dolly',
        lens: '35mm prime',
      },
      palette: ['#FF00CC', '#00E5FF', '#1B0033'],
      soundtrack: {
        tempo: 110,
        instrumentation: ['analog synths', 'electronic drums'],
      },
    },
    related: ['urban-dawn'],
  },
  {
    id: 'rainy-cafe',
    name: 'Rainy Café',
    tagline: 'Intimate reflections under a soft grey drizzle.',
    prompt:
      'Close-up handheld footage of raindrops racing down a café window as a barista pulls a shot. Shallow depth of field, muted blues and ambers, ambient jazz piano echoing in the distance.',
    tags: ['romantic', 'intimate', 'cozy', 'rain'],
    modelSupport: ['Veo', 'Pika'],
    useCases: ['Product storytelling', 'Short-form vignettes', 'Editorial mood pieces'],
    previewImageUrl: '/sample-thumbnails/rainy-cafe.jpg',
    jsonSchema: {
      aspect_ratio: '4:5',
      pacing: 'slow',
      camera: {
        movement: 'handheld micro-tracking',
        lens: '50mm prime',
      },
      palette: ['#94A3B8', '#1E293B', '#FBBF24'],
      soundtrack: {
        tempo: 72,
        instrumentation: ['piano', 'brush kit'],
      },
    },
    related: ['bittersweet-memory'],
  },
  {
    id: 'bittersweet-memory',
    name: 'Bittersweet Memory',
    tagline: 'Nostalgia wrapped in handheld imperfection.',
    prompt:
      'Super 8-style footage of two friends walking along a windswept pier. Film grain, light leaks, sun-flared silhouettes, melancholic guitar chords swelling as waves crash.',
    tags: ['nostalgic', 'melancholic', 'handheld'],
    modelSupport: ['Sora', 'Veo'],
    useCases: ['Indie films', 'Lyric videos', 'Documentary bumpers'],
    previewImageUrl: '/sample-thumbnails/bittersweet-memory.jpg',
    jsonSchema: {
      aspect_ratio: '3:2',
      pacing: 'gentle',
      camera: {
        movement: 'handheld follow',
        lens: 'vintage 40mm',
      },
      palette: ['#F1D3B3', '#2D3748', '#A0AEC0'],
      soundtrack: {
        tempo: 78,
        instrumentation: ['acoustic guitar', 'vinyl crackle'],
      },
    },
    related: ['rainy-cafe'],
  },
  {
    id: 'startup-hustle',
    name: 'Startup Hustle',
    tagline: 'High-energy montage of founders in motion.',
    prompt:
      'Fast-cut montage of diverse founders in a glass-walled workspace brainstorming, sketching prototypes, and pitching. Kinetic transitions, upbeat electronic percussion, warm natural lighting.',
    tags: ['entrepreneurial', 'energetic', 'corporate'],
    modelSupport: ['Sora', 'Pika'],
    useCases: ['Pitch decks', 'Product launches', 'Recruiting reels'],
    previewImageUrl: '/sample-thumbnails/startup-hustle.jpg',
    jsonSchema: {
      aspect_ratio: '16:9',
      pacing: 'fast',
      camera: {
        movement: 'gimbal walk-and-talk',
        lens: '24-70mm zoom',
      },
      palette: ['#F59E0B', '#1F2937', '#ECFEFF'],
      soundtrack: {
        tempo: 124,
        instrumentation: ['electronic drums', 'plucky synth'],
      },
    },
    related: ['urban-dawn'],
  },
  {
    id: 'wilderness-reverie',
    name: 'Wilderness Reverie',
    tagline: 'Dreamlike nature immersion with painterly textures.',
    prompt:
      'Sweeping steadicam glide through a misty evergreen forest at sunrise. Particles catching light, soft focus blooms, orchestral swells entwined with distant birdsong.',
    tags: ['nature', 'ethereal', 'slow cinema'],
    modelSupport: ['Veo', 'Runway'],
    useCases: ['Wellness campaigns', 'Meditation apps', 'Event ambience'],
    previewImageUrl: '/sample-thumbnails/wilderness-reverie.jpg',
    jsonSchema: {
      aspect_ratio: '9:16',
      pacing: 'gradual',
      camera: {
        movement: 'steadicam drift',
        lens: '35mm prime',
      },
      palette: ['#0F172A', '#4ADE80', '#FDE68A'],
      soundtrack: {
        tempo: 60,
        instrumentation: ['strings', 'field recordings'],
      },
    },
    related: ['rainy-cafe'],
  },
];

async function seed() {
  const db = await bootstrapFirebase();
  const batch = db.batch();

  for (const vibe of vibeSeeds) {
    const ref = db.collection('vibes').doc(vibe.id);
    batch.set(ref, {
      ...vibe,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  await batch.commit();
  console.log(`Seeded ${vibeSeeds.length} vibes into Firestore.`);
}

seed().catch((error) => {
  console.error('Failed to seed vibes');
  console.error(error);
  process.exit(1);
});
