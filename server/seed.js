const { sequelize, Property, User, Role, Client, Interaction } = require('./models');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Konekcija sa bazom uspostavljena.');

        // Nabavi ili kreiraj role
        const [adminRole] = await Role.findOrCreate({ where: { name: 'admin' } });
        const [agentRole] = await Role.findOrCreate({ where: { name: 'agent' } });
        const [clientRole] = await Role.findOrCreate({ where: { name: 'klijent' } });

        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Kreiraj test korisnike
        const usersToCreate = [
            { name: 'Sistem Admin', email: 'admin@example.com', password: hashedPassword, roleId: adminRole.id },
            { name: 'Glavni Agent', email: 'agent@example.com', password: hashedPassword, roleId: agentRole.id },
            { name: 'Test Klijent', email: 'client@example.com', password: hashedPassword, roleId: clientRole.id }
        ];

        for (const userData of usersToCreate) {
            const [user, created] = await User.findOrCreate({
                where: { email: userData.email },
                defaults: userData
            });
            if (!created) {
                await user.update({ password: hashedPassword, roleId: userData.roleId });
            }
        }
        console.log('Test korisnici (Admin, Agent, Klijent) su spremni.');

        // Nabavimo agenta za koga ćemo vezati nekretnine
        const mainAgent = await User.findOne({ where: { email: 'agent@example.com' } });

        // Brisanje starih podataka (redosted je bitan zbog stranih ključeva)
        await Interaction.destroy({ where: {}, truncate: true, cascade: true });
        await Client.destroy({ where: {}, truncate: true, cascade: true });
        await Property.destroy({ where: {}, truncate: true, cascade: true });

        // Dodajemo demo nekretnine
        const properties = await Property.bulkCreate([
            {
                title: "Luksuzan stan u centru",
                description: "Prelep, svetao stan sa pogledom na grad. Novoizgradjeno.",
                price: 250000,
                location: "Knez Mihailova 1, Beograd",
                imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
                status: "available",
                userId: mainAgent.id
            },
            {
                title: "Porodična kuća sa dvorištem",
                description: "Kuća pogodna za porodicu, na periferiji u mirnom kraju.",
                price: 180000,
                location: "Zemunska 12, Zemun",
                imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80",
                status: "available",
                userId: mainAgent.id
            },
            {
                title: "Moderni studio apartman",
                description: "Odličan za studente i mlade profesionalce.",
                price: 80000,
                location: "Bulevar Kralja Aleksandra 150, Beograd",
                imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                status: "available",
                userId: mainAgent.id
            },
            {
                title: "Penthouse sa bazenom",
                description: "Ekskluvivan penthouse na vrhu zgrade sa privatnim bazenom.",
                price: 550000,
                location: "Dedinje, Beograd",
                imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                status: "sold",
                userId: mainAgent.id
            },
            {
                title: "Vikendica na Fruškoj Gori",
                description: "Mirna vikendica okružena prirodom, idealna za odmor.",
                price: 120000,
                location: "Vrdnik, Fruška Gora",
                imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
                status: "sold",
                userId: mainAgent.id
            }
        ]);

        // Dodajemo demo klijente
        const clients = await Client.bulkCreate([
            { fullName: "Marko Marković", email: "marko@example.com", phone: "061234567" },
            { fullName: "Jelena Jović", email: "jelena@example.com", phone: "064555666" }
        ]);

        // Dodajemo demo interakcije
        await Interaction.bulkCreate([
            {
                type: "Poziv",
                date: new Date(),
                notes: "Klijent zainteresovan za stan u centru.",
                clientId: clients[0].id,
                propertyId: properties[0].id,
                userId: mainAgent.id
            },
            {
                type: "Sastanak",
                date: new Date(),
                notes: "Obilazak kuće u Zemunu zakazan za sutra.",
                clientId: clients[1].id,
                propertyId: properties[1].id,
                userId: mainAgent.id
            }
        ]);

        console.log('Uspešno dodati demo podaci (Nekretnine, Klijenti, Interakcije).');
        process.exit(0);
    } catch (error) {
        console.error('Greška pri popunjavanju baze:', error);
        process.exit(1);
    }
}

seed();
