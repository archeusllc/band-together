import { PrismaClient } from '../shared';

const prisma = PrismaClient();

async function main() {
  console.log('Seeding sample events...');

  try {
    // Get or create user with email brandonmlee85@gmail.com
    let user = await prisma.user.findUnique({
      where: { email: 'brandonmlee85@gmail.com' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'brandonmlee85@gmail.com',
          displayName: 'Brandon Lee'
        }
      });
      console.log('✓ Created user:', user.email);
    } else {
      console.log('✓ Found user:', user.email);
    }

    // Create A.T. Rifle and The Firearms act
    let atRifleAct = await prisma.act.findFirst({
      where: { name: 'A.T. Rifle and The Firearms' }
    });

    if (!atRifleAct) {
      atRifleAct = await prisma.act.create({
        data: {
          name: 'A.T. Rifle and The Firearms',
          bio: 'A dynamic live band bringing energy and fire to every show'
        }
      });
      console.log('✓ Created act:', atRifleAct.name);
    }

    // Create Obligation Anxiety act
    let obligationAnxietyAct = await prisma.act.findFirst({
      where: { name: 'Obligation Anxiety' }
    });

    if (!obligationAnxietyAct) {
      obligationAnxietyAct = await prisma.act.create({
        data: {
          name: 'Obligation Anxiety',
          bio: 'An intense and compelling musical experience'
        }
      });
      console.log('✓ Created act:', obligationAnxietyAct.name);
    }

    // Create Old People Tavern venue
    let oldPeopleTavern = await prisma.venue.findFirst({
      where: { name: 'Old People Tavern' }
    });

    if (!oldPeopleTavern) {
      oldPeopleTavern = await prisma.venue.create({
        data: {
          name: 'Old People Tavern',
          address: '1247 Atlantic Ave',
          city: 'Virginia Beach',
          state: 'VA',
          zipCode: '23451'
        }
      });
      console.log('✓ Created venue:', oldPeopleTavern.name);
    }

    // Create Seamus O'Shrub's Irish Pub venue
    let seamusVenue = await prisma.venue.findFirst({
      where: { name: "Seamus O'Shrub's Irish Pub" }
    });

    if (!seamusVenue) {
      seamusVenue = await prisma.venue.create({
        data: {
          name: "Seamus O'Shrub's Irish Pub",
          address: '812 Virginia Beach Blvd',
          city: 'Virginia Beach',
          state: 'VA',
          zipCode: '23451'
        }
      });
      console.log('✓ Created venue:', seamusVenue.name);
    }

    // Calculate dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20, 0, 0, 0);

    const thisSunday = new Date();
    const daysUntilSunday = (7 - thisSunday.getDay()) % 7 || 7;
    thisSunday.setDate(thisSunday.getDate() + daysUntilSunday);
    thisSunday.setHours(12, 0, 0, 0);

    const twoSaturdaysFromNow = new Date();
    const daysUntilNextSaturday = (6 - twoSaturdaysFromNow.getDay() + 7) % 7 || 7;
    twoSaturdaysFromNow.setDate(twoSaturdaysFromNow.getDate() + daysUntilNextSaturday + 7);
    twoSaturdaysFromNow.setHours(20, 0, 0, 0);

    // Event 1: A.T. Rifle and The Firearms at Old People Tavern tomorrow at 8pm (4 hours)
    const event1 = await prisma.calendarEvent.create({
      data: {
        title: 'A.T. Rifle and The Firearms Live Show',
        description: 'An energetic 4-hour set from A.T. Rifle and The Firearms',
        startTime: tomorrow,
        duration: 240,
        venueId: oldPeopleTavern.venueId,
        acts: {
          connect: [{ actId: atRifleAct.actId }]
        }
      },
      include: {
        venue: true,
        acts: true
      }
    });
    console.log(`✓ Created event: "${event1.title}" on ${tomorrow.toDateString()} at 8pm`);

    // Event 2: Obligation Anxiety rehearsal with user this Sunday at noon (2 hours, rehearsal)
    const event2 = await prisma.calendarEvent.create({
      data: {
        title: 'Obligation Anxiety Rehearsal with Brandon',
        description: 'Rehearsal session',
        startTime: thisSunday,
        duration: 120,
        venueId: oldPeopleTavern.venueId,
        acts: {
          connect: [{ actId: obligationAnxietyAct.actId }]
        }
      },
      include: {
        venue: true,
        acts: true
      }
    });
    console.log(`✓ Created event: "${event2.title}" on ${thisSunday.toDateString()} at noon`);

    // Event 3: Obligation Anxiety show at Seamus O'Shrub's Irish Pub two Saturdays from now at 8pm
    const event3 = await prisma.calendarEvent.create({
      data: {
        title: "Obligation Anxiety at Seamus O'Shrub's",
        description: "Obligation Anxiety performs live at Seamus O'Shrub's Irish Pub",
        startTime: twoSaturdaysFromNow,
        duration: 180,
        venueId: seamusVenue.venueId,
        acts: {
          connect: [{ actId: obligationAnxietyAct.actId }]
        }
      },
      include: {
        venue: true,
        acts: true
      }
    });
    console.log(`✓ Created event: "${event3.title}" on ${twoSaturdaysFromNow.toDateString()} at 8pm`);

    console.log('\n✨ Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
