import { readdir, readFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

export async function findSvgFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(current: string) {
    const entries = await readdir(current);
    for (const entry of entries) {
      const full = join(current, entry);
      const s = await stat(full);
      if (s.isDirectory()) {
        await walk(full);
      } else if (extname(entry) === '.svg') {
        files.push(full);
      }
    }
  }

  await walk(dir);
  return files;
}

export function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function extractSvgInner(svgContent: string): string {
  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  return match ? match[1].trim() : '';
}

export function extractSvgViewBox(svgContent: string): string | null {
  const match = svgContent.match(/viewBox="([^"]+)"/);
  return match ? match[1] : null;
}

export function getSvgAttributes(svgContent: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const svgTag = svgContent.match(/<svg([^>]*)>/i)?.[1] ?? '';
  const attrRegex = /(\w[\w-]*)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = attrRegex.exec(svgTag)) !== null) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

export function getIconName(filePath: string): string {
  return basename(filePath, '.svg');
}

export function getIconVariant(filePath: string): 'outline' | 'filled' | 'brand' {
  if (filePath.includes('outline')) return 'outline';
  if (filePath.includes('filled')) return 'filled';
  if (filePath.includes('brands')) return 'brand';
  return 'outline';
}

export async function readSvg(filePath: string): Promise<string> {
  return readFile(filePath, 'utf-8');
}

export function svgInnerToJsx(inner: string): string {
  return inner
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/class=/g, 'className=');
}
