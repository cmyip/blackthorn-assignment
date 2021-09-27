import {Seeder} from "./seeder";

async function runSeeder() {
    const runner = new Seeder();
    await runner.configure();
    await runner.seedAll();
}

console.log("Starting Seeder");
runSeeder().then(() => {
    console.log("Seed completed");
});
