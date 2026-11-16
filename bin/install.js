#!/usr/bin/env node
/**
 * مثبّت مهارة المدقق اللغوي العربي.
 *
 *   npx arabic-writing-skill                 تثبيت عام (مجلد المستخدم) لكل الوكلاء المدعومين
 *   npx arabic-writing-skill --project       تثبيت داخل المشروع الحالي فقط
 *   npx arabic-writing-skill --agent claude  تثبيت لوكيل واحد (claude | agents)
 *   npx arabic-writing-skill --dir <path>    تثبيت في مجلد مخصص
 *   npx arabic-writing-skill uninstall       إزالة المهارة
 *   npx arabic-writing-skill list            عرض مسارات التثبيت دون تنفيذ
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_NAME = "arabic-writing";
const SOURCE = path.join(__dirname, "..", "skills", SKILL_NAME);

// مجلدات المهارات المعروفة. «agents» هو المجلد المشترك الذي تقرؤه أدوات
// متوافقة مع معيار Agent Skills (مثل Codex وغيره).
const AGENTS = {
  claude: (base) => path.join(base, ".claude", "skills"),
  agents: (base) => path.join(base, ".agents", "skills"),
};

function parseArgs(argv) {
  const opts = { command: "install", project: false, agents: [], dir: null, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "install" || a === "uninstall" || a === "list") opts.command = a;
    else if (a === "--project" || a === "-p") opts.project = true;
    else if (a === "--agent" || a === "-a") opts.agents.push(argv[++i]);
    else if (a === "--dir" || a === "-d") opts.dir = argv[++i];
    else if (a === "--help" || a === "-h") opts.help = true;
    else {
      console.error(`خيار غير معروف: ${a}`);
      process.exit(2);
    }
  }
  return opts;
}

function targets(opts) {
  if (opts.dir) return [path.resolve(opts.dir)];
  const base = opts.project ? process.cwd() : os.homedir();
  const names = opts.agents.length ? opts.agents : Object.keys(AGENTS);
  return names.map((n) => {
    if (!AGENTS[n]) {
      console.error(`وكيل غير معروف: ${n} (المتاح: ${Object.keys(AGENTS).join(", ")})`);
      process.exit(2);
    }
    return AGENTS[n](base);
  });
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(fs.readFileSync(__filename, "utf8").split("*/")[0].replace(/^[\s\S]*?\*\n/, ""));
    return;
  }
  if (!fs.existsSync(path.join(SOURCE, "SKILL.md"))) {
    console.error(`لم يُعثر على المهارة في ${SOURCE}`);
    process.exit(1);
  }

  for (const dir of targets(opts)) {
    const dest = path.join(dir, SKILL_NAME);
    if (opts.command === "list") {
      console.log(`${fs.existsSync(dest) ? "✓ مثبّتة" : "· غير مثبّتة"}  ${dest}`);
    } else if (opts.command === "uninstall") {
      if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
        console.log(`✗ أُزيلت: ${dest}`);
      } else {
        console.log(`· غير موجودة: ${dest}`);
      }
    } else {
      fs.mkdirSync(dir, { recursive: true });
      fs.rmSync(dest, { recursive: true, force: true }); // تحديث نظيف
      fs.cpSync(SOURCE, dest, { recursive: true });
      console.log(`✓ ثُبّتت: ${dest}`);
    }
  }
  if (opts.command === "install") {
    console.log("\nأعد تشغيل الوكيل (Claude Code أو غيره) لتظهر المهارة.");
  }
}

main();
