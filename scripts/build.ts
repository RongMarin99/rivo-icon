import { execSync } from 'child_process';

function run(cmd: string, label: string) {
  console.log(`\n→ ${label}`);
  execSync(cmd, { stdio: 'inherit' });
}

run('tsx scripts/optimize.ts', 'Optimize & normalize SVGs to 24×24');
run('tsx scripts/validate.ts', 'Validate SVGs');
run('tsx scripts/generate.ts', 'Generate components');
console.log('\nPipeline complete. Run `pnpm build` to compile packages.');
