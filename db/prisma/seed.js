import { PrismaClient } from '../../shared/index.js';

const prisma = PrismaClient();

// Default admin/system user ID for seeding
const SYSTEM_USER_ID = "system";

async function main() {
  console.log("🌱 Seeding database with popular songs...");

  const songs = [
    // Commitment Issues Playlist - Rock/Alt/Metal
    { title: "Hash Pipe", artist: "Weezer", defaultDuration: 187, defaultTuning: "Standard" },
    { title: "I Believe in a Thing Called Love", artist: "The Darkness", defaultDuration: 216, defaultTuning: "Standard" },
    { title: "Say It Ain't So", artist: "Weezer", defaultDuration: 259, defaultTuning: "Standard" },
    { title: "Peaches", artist: "The Presidents Of The United States Of America", defaultDuration: 172, defaultTuning: "Standard" },
    { title: "Flagpole Sitta", artist: "Harvey Danger", defaultDuration: 217, defaultTuning: "Standard" },
    { title: "My Own Worst Enemy", artist: "Lit", defaultDuration: 169, defaultTuning: "Standard" },
    { title: "Inside Out", artist: "Eve 6", defaultDuration: 219, defaultTuning: "Standard" },
    { title: "Like a Stone", artist: "Audioslave", defaultDuration: 294, defaultTuning: "Drop D" },
    { title: "Creep", artist: "Radiohead", defaultDuration: 239, defaultTuning: "Standard" },
    { title: "The Red", artist: "Chevelle", defaultDuration: 238, defaultTuning: "Drop D" },
    { title: "The Middle", artist: "Jimmy Eat World", defaultDuration: 166, defaultTuning: "Standard" },
    { title: "Possum Kingdom", artist: "Toadies", defaultDuration: 308, defaultTuning: "Standard" },
    { title: "Man in the Box", artist: "Alice In Chains", defaultDuration: 285, defaultTuning: "Drop D" },
    { title: "Bulls On Parade", artist: "Rage Against The Machine", defaultDuration: 268, defaultTuning: "Standard" },
    { title: "All My Life", artist: "Foo Fighters", defaultDuration: 245, defaultTuning: "Standard" },
    { title: "Enter Sandman", artist: "Metallica", defaultDuration: 328, defaultTuning: "Standard" },
    { title: "For Whom The Bell Tolls", artist: "Metallica", defaultDuration: 307, defaultTuning: "Standard" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", defaultDuration: 301, defaultTuning: "Drop D" },
    { title: "Toxicity", artist: "System Of A Down", defaultDuration: 331, defaultTuning: "Drop D" },
    { title: "I Hate Everything About You", artist: "Three Days Grace", defaultDuration: 207, defaultTuning: "Standard" },
    { title: "Are You Gonna Be My Girl", artist: "Jet", defaultDuration: 189, defaultTuning: "Standard" },
    { title: "Killing In The Name", artist: "Rage Against The Machine", defaultDuration: 244, defaultTuning: "Standard" },
    { title: "Shine", artist: "Collective Soul", defaultDuration: 267, defaultTuning: "Standard" },
    { title: "Fuel", artist: "Metallica", defaultDuration: 283, defaultTuning: "Standard" },
    { title: "Everlong", artist: "Foo Fighters", defaultDuration: 250, defaultTuning: "Standard" },
    { title: "Basket Case", artist: "Green Day", defaultDuration: 247, defaultTuning: "Standard" },
    { title: "American Idiot", artist: "Green Day", defaultDuration: 182, defaultTuning: "Standard" },
    { title: "Outshined", artist: "Soundgarden", defaultDuration: 282, defaultTuning: "Standard" },
    { title: "Song 2", artist: "Blur", defaultDuration: 122, defaultTuning: "Standard" },
    { title: "My Hero", artist: "Foo Fighters", defaultDuration: 258, defaultTuning: "Standard" },
  ];

  let seedCount = 0;

  for (const song of songs) {
    const existingTrack = await prisma.track.findFirst({
      where: {
        title: song.title,
        artist: song.artist,
      },
    });

    if (!existingTrack) {
      await prisma.track.create({
        data: {
          type: "SONG",
          title: song.title,
          artist: song.artist,
          defaultDuration: song.defaultDuration,
          defaultTuning: song.defaultTuning,
          isActive: true,
          createdBy: SYSTEM_USER_ID,
        },
      });
      seedCount++;
    }
  }

  console.log(
    `✅ Seeding complete! Added ${seedCount} new songs to the database.`
  );
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
