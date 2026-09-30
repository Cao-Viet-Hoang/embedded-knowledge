#!/usr/bin/env node
/* Validates the question-bank data files in assets/js/qbank/.
   Usage: node tools/validate-qbank.js [file ...]   (default: all *.js in the folder) */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DIR = path.join(__dirname, "..", "assets", "js", "qbank");
const TOPICS = ["intro", "project", "autosar", "embedded", "protocols", "debug", "testing", "process", "cicd", "linux"];
const TYPES = ["theory", "practical", "behavioral"];
const LANGS = ["c", "cpp", "python", "yaml", "bash", "text"];

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(DIR).filter(f => f.endsWith(".js")).map(f => path.join(DIR, f));

const errors = [];
const ids = new Map();
let total = 0;
const perTopic = {};

for (const file of files) {
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  } catch (e) {
    errors.push(`${file}: does not parse/run: ${e.message}`);
    continue;
  }
  const items = sandbox.window.QBANK || [];
  if (!items.length) errors.push(`${file}: pushes no items to window.QBANK`);
  items.forEach((it, i) => {
    const where = `${path.basename(file)}#${i} (${it && it.id})`;
    const err = m => errors.push(`${where}: ${m}`);
    const str = (k, min) => { if (typeof it[k] !== "string" || it[k].trim().length < min) err(`"${k}" must be a string of >= ${min} chars`); };
    const arr = (k, lo, hi) => {
      const v = it[k];
      if (!Array.isArray(v) || v.length < lo || v.length > hi || v.some(s => typeof s !== "string" || !s.trim())) err(`"${k}" must be an array of ${lo}-${hi} non-empty strings`);
    };
    str("id", 3); str("q", 10); str("answer", 150);
    if (!TOPICS.includes(it.topic)) err(`topic "${it.topic}" not in ${TOPICS.join(",")}`);
    if (!TYPES.includes(it.type)) err(`type "${it.type}" not in ${TYPES.join(",")}`);
    arr("tags", 2, 15); arr("key", 2, 6);
    if (it.followups !== undefined) arr("followups", 1, 4);
    if (it.bridge !== undefined && typeof it.bridge !== "boolean") err(`"bridge" must be boolean`);
    if (it.code !== undefined) { str("code", 5); if (!LANGS.includes(it.lang)) err(`"lang" must be one of ${LANGS.join(",")} when code is set`); }
    const allowed = ["id", "topic", "type", "bridge", "q", "tags", "key", "answer", "code", "lang", "followups"];
    Object.keys(it).forEach(k => { if (!allowed.includes(k)) err(`unknown field "${k}"`); });
    if (ids.has(it.id)) err(`duplicate id (also in ${ids.get(it.id)})`); else ids.set(it.id, path.basename(file));
    if (/<(?!\/?(strong|em|code|b|i|br)\b)[a-z]/i.test(it.answer || "")) err(`answer uses HTML tags other than strong/em/code/b/i/br`);
    total++;
    perTopic[it.topic] = (perTopic[it.topic] || 0) + 1;
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log(`OK: ${total} questions in ${files.length} file(s)`, perTopic);
