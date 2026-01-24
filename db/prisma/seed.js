import { PrismaClient } from '../../shared/index.js';

const prisma = PrismaClient();

// Default admin/system user ID for seeding
const SYSTEM_USER_ID = "system";

async function main() {
  console.log("🌱 Seeding database with popular songs...");

  const songs = [
    // Keagans with Ti-MO-thy Spotify Playlist
    { title: "Slither", artist: "Velvet Revolver", defaultDuration: 248, defaultTuning: "Standard" },
    { title: "Show Me How to Live", artist: "Audioslave", defaultDuration: 278, defaultTuning: "Standard" },
    { title: "I Hate Everything About You", artist: "Three Days Grace", defaultDuration: 231, defaultTuning: "Standard" },
    { title: "Everlong", artist: "Foo Fighters", defaultDuration: 251, defaultTuning: "Standard" },
    { title: "My Own Worst Enemy", artist: "Lit", defaultDuration: 169, defaultTuning: "Standard" },
    { title: "Inside Out", artist: "Eve 6", defaultDuration: 219, defaultTuning: "Standard" },
    { title: "Flagpole Sitta", artist: "Harvey Danger", defaultDuration: 217, defaultTuning: "Standard" },
    { title: "Come Out and Play", artist: "The Offspring", defaultDuration: 198, defaultTuning: "Standard" },
    { title: "Possum Kingdom", artist: "Toadies", defaultDuration: 308, defaultTuning: "Standard" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", defaultDuration: 302, defaultTuning: "Standard" },
    { title: "Beautiful Disaster", artist: "311", defaultDuration: 238, defaultTuning: "Standard" },
    { title: "You're a Mean One, Mr. Grinch", artist: "Small Town Titans", defaultDuration: 258, defaultTuning: "Standard" },
    { title: "I Believe in a Thing Called Love", artist: "The Darkness", defaultDuration: 216, defaultTuning: "Standard" },
    { title: "All My Life", artist: "Foo Fighters", defaultDuration: 263, defaultTuning: "Standard" },
    { title: "Are You Gonna Be My Girl", artist: "Jet", defaultDuration: 214, defaultTuning: "Standard" },
    { title: "Comedown - 2014 Remastered", artist: "Bush", defaultDuration: 327, defaultTuning: "Standard" },
    { title: "Semi-Charmed Life", artist: "Third Eye Blind", defaultDuration: 268, defaultTuning: "Standard" },
    { title: "Heavy", artist: "Collective Soul", defaultDuration: 175, defaultTuning: "Standard" },
    { title: "Say It Ain't So - Original Mix", artist: "Weezer", defaultDuration: 259, defaultTuning: "Standard" },
    { title: "Song 2", artist: "Blur", defaultDuration: 122, defaultTuning: "Standard" },
    { title: "Man in the Box", artist: "Alice In Chains", defaultDuration: 285, defaultTuning: "Standard" },
    { title: "Fuel", artist: "Metallica", defaultDuration: 270, defaultTuning: "Standard" },
    { title: "The Boys of Summer", artist: "The Ataris", defaultDuration: 258, defaultTuning: "Standard" },
    { title: "My Hero", artist: "Foo Fighters", defaultDuration: 260, defaultTuning: "Standard" },
    { title: "Simple Man - Rock Version", artist: "Shinedown", defaultDuration: 266, defaultTuning: "Standard" },
    { title: "Bulls On Parade", artist: "Rage Against The Machine", defaultDuration: 229, defaultTuning: "Standard" },
    { title: "Aerials", artist: "System Of A Down", defaultDuration: 235, defaultTuning: "Standard" },
    { title: "The End of Heartache", artist: "Killswitch Engage", defaultDuration: 298, defaultTuning: "Standard" },
    { title: "Sober", artist: "TOOL", defaultDuration: 307, defaultTuning: "Standard" },
    { title: "Peaches", artist: "The Presidents Of The United States Of America", defaultDuration: 172, defaultTuning: "Standard" },
    { title: "Shine", artist: "Collective Soul", defaultDuration: 306, defaultTuning: "Standard" },
    { title: "The Middle", artist: "Jimmy Eat World", defaultDuration: 166, defaultTuning: "Standard" },
    { title: "Pardon Me", artist: "Incubus", defaultDuration: 224, defaultTuning: "Standard" },
    { title: "Comfortably Numb", artist: "Pink Floyd", defaultDuration: 382, defaultTuning: "Standard" },
    { title: "Crazy Train", artist: "Ozzy Osbourne", defaultDuration: 293, defaultTuning: "Standard" },
    { title: "For Whom The Bell Tolls (Remastered)", artist: "Metallica", defaultDuration: 310, defaultTuning: "Standard" },
    { title: "The Trooper - 2015 Remaster", artist: "Iron Maiden", defaultDuration: 253, defaultTuning: "Standard" },
    { title: "Zombie", artist: "The Cranberries", defaultDuration: 306, defaultTuning: "Standard" },
    { title: "Kryptonite", artist: "3 Doors Down", defaultDuration: 234, defaultTuning: "Standard" },
    { title: "Outshined - Remastered 2016", artist: "Soundgarden", defaultDuration: 311, defaultTuning: "Standard" },
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
