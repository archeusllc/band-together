import { prisma } from './src/services/prisma.service.ts';

// Default admin/system user ID for seeding
const SYSTEM_USER_ID = "system";

async function main() {
  console.log("🌱 Seeding database with popular songs...");

  const songs = [
    // Classic Rock
    { title: "Wonderwall", artist: "Oasis", defaultDuration: 258, defaultTuning: "Standard" },
    { title: "Wish You Were Here", artist: "Pink Floyd", defaultDuration: 297, defaultTuning: "Standard" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", defaultDuration: 482, defaultTuning: "Standard" },
    { title: "Hotel California", artist: "Eagles", defaultDuration: 391, defaultTuning: "Standard" },
    { title: "Comfortably Numb", artist: "Pink Floyd", defaultDuration: 409, defaultTuning: "Standard" },
    { title: "The Wall", artist: "Pink Floyd", defaultDuration: 234, defaultTuning: "Standard" },
    { title: "Paranoid Android", artist: "Radiohead", defaultDuration: 392, defaultTuning: "Standard" },
    { title: "Fake Plastic Trees", artist: "Radiohead", defaultDuration: 285, defaultTuning: "Standard" },
    { title: "Bitter Sweet Symphony", artist: "The Verve", defaultDuration: 345, defaultTuning: "Standard" },
    { title: "Don't Look Back in Anger", artist: "Oasis", defaultDuration: 302, defaultTuning: "Standard" },

    // Pop
    { title: "Somebody to Love", artist: "Queen", defaultDuration: 296, defaultTuning: "Standard" },
    { title: "Bohemian Rhapsody", artist: "Queen", defaultDuration: 354, defaultTuning: "Standard" },
    { title: "We Are the Champions", artist: "Queen", defaultDuration: 179, defaultTuning: "Standard" },
    { title: "Don't Stop Me Now", artist: "Queen", defaultDuration: 200, defaultTuning: "Standard" },
    { title: "Another One Bites the Dust", artist: "Queen", defaultDuration: 217, defaultTuning: "Standard" },
    { title: "Strawberry Fields Forever", artist: "The Beatles", defaultDuration: 255, defaultTuning: "Standard" },
    { title: "Let It Be", artist: "The Beatles", defaultDuration: 243, defaultTuning: "Standard" },
    { title: "Hey Jude", artist: "The Beatles", defaultDuration: 427, defaultTuning: "Standard" },
    { title: "Come Together", artist: "The Beatles", defaultDuration: 259, defaultTuning: "Standard" },
    { title: "Yesterday", artist: "The Beatles", defaultDuration: 125, defaultTuning: "Standard" },

    // Blues & Soul
    { title: "Layla", artist: "Derek and the Dominos", defaultDuration: 414, defaultTuning: "Drop D" },
    { title: "Sweet Home Chicago", artist: "Blues Brothers", defaultDuration: 350, defaultTuning: "Standard" },
    { title: "The Thrill Is Gone", artist: "B.B. King", defaultDuration: 300, defaultTuning: "Standard" },
    { title: "All Blues", artist: "Miles Davis", defaultDuration: 1080, defaultTuning: "Standard" },
    { title: "I Shot the Sheriff", artist: "Bob Marley", defaultDuration: 331, defaultTuning: "Standard" },

    // Folk & Singer-Songwriter
    { title: "Blowin' in the Wind", artist: "Bob Dylan", defaultDuration: 169, defaultTuning: "Standard" },
    { title: "The Times They Are a-Changin'", artist: "Bob Dylan", defaultDuration: 198, defaultTuning: "Standard" },
    { title: "Mad World", artist: "Gary Jules", defaultDuration: 213, defaultTuning: "Standard" },
    { title: "Hallelujah", artist: "Leonard Cohen", defaultDuration: 353, defaultTuning: "Standard" },
    { title: "Fast Car", artist: "Tracy Chapman", defaultDuration: 324, defaultTuning: "Standard" },

    // Modern Indie & Alternative
    { title: "Take Me Out", artist: "Franz Ferdinand", defaultDuration: 248, defaultTuning: "Standard" },
    { title: "Mr. Brightside", artist: "The Killers", defaultDuration: 224, defaultTuning: "Standard" },
    { title: "When You Were Young", artist: "The Killers", defaultDuration: 307, defaultTuning: "Standard" },
    { title: "Sex on Fire", artist: "Kings of Leon", defaultDuration: 242, defaultTuning: "Standard" },
    { title: "Use Somebody", artist: "Kings of Leon", defaultDuration: 238, defaultTuning: "Standard" },
    { title: "Creep", artist: "Radiohead", defaultDuration: 237, defaultTuning: "Standard" },
    { title: "Yellow", artist: "Coldplay", defaultDuration: 302, defaultTuning: "Standard" },
    { title: "Fix You", artist: "Coldplay", defaultDuration: 297, defaultTuning: "Standard" },
    { title: "Viva la Vida", artist: "Coldplay", defaultDuration: 242, defaultTuning: "Standard" },

    // Acoustic & Stripped Down
    { title: "House of the Rising Sun", artist: "The Animals", defaultDuration: 342, defaultTuning: "Standard" },
    { title: "Black", artist: "Pearl Jam", defaultDuration: 375, defaultTuning: "Standard" },
    { title: "Landslide", artist: "Fleetwood Mac", defaultDuration: 247, defaultTuning: "Standard" },
    { title: "Dreams", artist: "Fleetwood Mac", defaultDuration: 264, defaultTuning: "Standard" },
    { title: "Go Your Own Way", artist: "Fleetwood Mac", defaultDuration: 210, defaultTuning: "Standard" },
    { title: "The Sound of Silence", artist: "Simon & Garfunkel", defaultDuration: 259, defaultTuning: "Standard" },
    { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", defaultDuration: 302, defaultTuning: "Standard" },

    // Metal & Hard Rock
    { title: "Smoke on the Water", artist: "Deep Purple", defaultDuration: 314, defaultTuning: "Standard" },
    { title: "Iron Man", artist: "Black Sabbath", defaultDuration: 309, defaultTuning: "Drop D" },
    { title: "Master of Puppets", artist: "Metallica", defaultDuration: 485, defaultTuning: "Standard" },
    { title: "Enter Sandman", artist: "Metallica", defaultDuration: 330, defaultTuning: "Standard" },
    { title: "Back in Black", artist: "AC/DC", defaultDuration: 209, defaultTuning: "Standard" },
    { title: "Highway to Hell", artist: "AC/DC", defaultDuration: 210, defaultTuning: "Standard" },

    // Funk & Groove
    { title: "Superstition", artist: "Stevie Wonder", defaultDuration: 269, defaultTuning: "Standard" },
    { title: "Give It Up", artist: "The Commodores", defaultDuration: 290, defaultTuning: "Standard" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", defaultDuration: 281, defaultTuning: "Standard" },
    { title: "Billie Jean", artist: "Michael Jackson", defaultDuration: 294, defaultTuning: "Standard" },
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
