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
        if (!agent) {
            agent = await User.create({
                name: 'Test Agent',
                email: 'agent@example.com',
                password: 'password123', // Nije hashovan zbog jednostavnosti seedera, ali ovo je samo za demo
                roleId: agentRole.id
            });
            console.log('Kreiran test agent.');
        }

        // Dodajemo demo nekretnine
        await Property.bulkCreate([
            {
                title: "Luksuzan stan u centru",
                description: "Prelep, svetao stan sa pogledom na grad. Novoizgradjeno.",
                price: 250000,
                location: "Knez Mihailova 1, Beograd",
                userId: agent.id
            },
            {
                title: "Porodična kuća sa dvorištem",
                description: "Kuća pogodna za porodicu, na periferiji u mirnom kraju.",
                price: 180000,
                location: "Zemunska 12, Zemun",
                userId: agent.id
            },
            {
                title: "Moderni studio apartman",
                description: "Odličan za studente i mlade profesionalce.",
                price: 80000,
                location: "Bulevar Kralja Aleksandra 150, Beograd",
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
