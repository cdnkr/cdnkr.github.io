import { transformSync } from '@babel/core';
import { readFile } from 'node:fs/promises';
import { compile } from '@mdx-js/mdx';

export async function load(url, context, defaultLoad) {
  if (url.endsWith('.jsx')) {
    const source = await readFile(new URL(url), 'utf8');
    const transformed = transformSync(source, {
      filename: url,
      presets: ['@babel/preset-react'],
      babelrc: false
    });
    return {
      format: 'module',
      source: transformed.code,
      shortCircuit: true
    };
  }
  
  if (url.endsWith('.mdx')) {
    const source = await readFile(new URL(url), 'utf8');
    const compiled = await compile(source, {
      jsx: true,
      jsxRuntime: 'automatic'
    });
    return {
      format: 'module',
      source: String(compiled),
      shortCircuit: true
    };
  }
  
  return defaultLoad(url, context, defaultLoad);
}