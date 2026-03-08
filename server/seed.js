const { sequelize, Property, User, Role } = require('./models');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Konekcija sa bazom uspostavljena.');

        // Nabavi ili kreiraj rolu
        let agentRole = await Role.findOne({ where: { name: 'agent' } });
        if (!agentRole) {
            agentRole = await Role.create({ name: 'agent' });
        }

        // Proveravamo da li postoji neki agent, ako ne, kreiramo ga
        let agent = await User.findOne({ where: { roleId: agentRole.id } });
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash('password123', 10);

        if (!agent) {
            agent = await User.create({
                name: 'Test Agent',
                email: 'agent@example.com',
                password: hashedPassword,
                roleId: agentRole.id
            });
            console.log('Kreiran test agent.');
        } else {
            // Ažuriramo mu lozinku da budemo sigurni da je hashovana
            await agent.update({ password: hashedPassword });
        }

        // Brišemo stare nekretnine da bismo osvežili podatke sa slikama
        await Property.destroy({ where: {}, truncate: true, cascade: true });

        // Dodajemo demo nekretnine
        await Property.bulkCreate([
            {
                title: "Luksuzan stan u centru",
                description: "Prelep, svetao stan sa pogledom na grad. Novoizgradjeno.",
                price: 250000,
                location: "Knez Mihailova 1, Beograd",
                imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
                userId: agent.id
            },
            {
                title: "Porodična kuća sa dvorištem",
                description: "Kuća pogodna za porodicu, na periferiji u mirnom kraju.",
                price: 180000,
                location: "Zemunska 12, Zemun",
                imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80",
                userId: agent.id
            },
            {
                title: "Moderni studio apartman",
                description: "Odličan za studente i mlade profesionalce.",
                price: 80000,
                location: "Bulevar Kralja Aleksandra 150, Beograd",
                imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                userId: agent.id
            }
        ]);

        console.log('Uspešno dodate test nekretnine u bazu.');
        process.exit(0);
    } catch (error) {
        console.error('Greška pri popunjavanju baze:', error);
        process.exit(1);
    }
}

seed();
