"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const plannerPassword = await bcrypt.hash('planner123', 10);
    const driverPassword = await bcrypt.hash('driver123', 10);
    const planner = await prisma.user.upsert({
        where: { email: 'planner@example.com' },
        update: {},
        create: {
            fullName: 'Planner',
            email: 'planner@example.com',
            password: plannerPassword,
            status: 'active',
        },
    });
    console.log('✓ Planner user created:', planner);
    const driver = await prisma.user.upsert({
        where: { email: 'driver@example.com' },
        update: {},
        create: {
            fullName: 'Driver',
            email: 'driver@example.com',
            password: driverPassword,
            status: 'active',
        },
    });
    console.log('✓ Driver user created:', driver);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map