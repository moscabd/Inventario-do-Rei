const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar empresa matriz
  const company = await prisma.company.upsert({
    where: { document: '00000000000100' },
    update: {},
    create: {
      name: 'Matriz Imperial',
      document: '00000000000100',
    },
  });

  console.log('Company created:', company.id);

  // Criar alguns patrimônios Reais
  await prisma.asset.create({
    data: {
      tagNumber: 'REI-001',
      name: 'Servidor Dell PowerEdge R750',
      category: 'TI / Infraestrutura',
      status: 'IN_USE',
      currentValue: 45000.00,
      companyId: company.id,
    }
  });

  await prisma.asset.create({
    data: {
      tagNumber: 'REI-002',
      name: 'Herman Miller Aeron Chair',
      category: 'Mobiliário',
      status: 'ACTIVE',
      currentValue: 12500.00,
      companyId: company.id,
    }
  });

  await prisma.asset.create({
    data: {
      tagNumber: 'REI-003',
      name: 'MacBook Pro M3 Max',
      category: 'TI / Dispositivos',
      status: 'MAINTENANCE',
      currentValue: 32000.00,
      companyId: company.id,
    }
  });

  console.log('Assets seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
