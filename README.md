# المدقق اللغوي العربي — Arabic Writing Skill

[![Listed in Awesome Agent Skills](https://sagargupta.online/awesome-skills/badge.svg)](https://github.com/Sagargupta16/awesome-skills)

مهارة (Skill) مفتوحة المصدر لنماذج الذكاء الاصطناعي، مثل Claude، تعمل عمل **مدقق لغوي ومحرر عربي**:

- ✅ **تصحيح الإملاء**: الهمزات، والتاء المربوطة والهاء، والألف المقصورة، وألف التنوين، والألف الفارقة.
- ✅ **تصحيح النحو**: العدد والمعدود، والمطابقة، والأسماء الخمسة، والنواسخ، والممنوع من الصرف.
- ✅ **ضبط الترقيم**: العلامات العربية والمسافات حولها.
- ✅ **مراجعة التركيب**: طول الجمل، والروابط، والحشو، والأساليب المترجمة، وترابط الفقرات.
- ✅ **الصياغة البلاغية**: إعادة الصياغة بحسب المقام، رسميًّا أو صحفيًّا أو أدبيًّا، بأساليب المعاني والبيان والبديع.

## مثال

**المدخل:**
> انشاء الله سيتم عقد الاجتماع الى يوم الأحد , لاكن نرجوا من كافة الموظفين الإلتزام بالموعد.

**المخرج:**
> إن شاء الله يُعقد الاجتماع يوم الأحد، لكن نرجو من الموظفين كافةً الالتزام بالموعد.

| الأصل | التصحيح | النوع |
|---|---|---|
| انشاء الله | إن شاء الله | إملاء |
| سيتم عقد | يُعقد | أسلوب |
| الى | (حُذفت: «إلى» لا تناسب السياق) | تركيب |
| , | ، | ترقيم |
| لاكن | لكن | إملاء |
| نرجوا | نرجو | إملاء |
| كافة الموظفين | الموظفين كافةً | الأفصح |
| الإلتزام | الالتزام | إملاء |

## التثبيت

المهارة مكتوبة وفق معيار [Agent Skills](https://agentskills.io) (ملف `SKILL.md`)، وهو معيار مفتوح تدعمه أدوات كثيرة، منها Claude Code وCodex وCursor وGitHub Copilot وGemini CLI.

### الطريقة ١: أداة `skills` (لكل الوكلاء دفعة واحدة) — موصى بها
أداة [skills](https://github.com/vercel-labs/skills) تكتشف الوكلاء المثبّتين عندك وتثبّت المهارة لهم:
```bash
npx skills add a-khalid/arabic-writing-skill -g
```
- `-g`: تثبيت عام لكل المشاريع. بدونه تُثبَّت في المشروع الحالي فقط.
- `-a claude-code -a codex -a cursor`: لاختيار وكلاء محددين.
- `-y`: بلا أسئلة تأكيد (مناسب لـ CI).

### الطريقة ٢: مثبّت npm الخاص بالمشروع
```bash
npx arabic-writing-skill
```
يثبّت المهارة تثبيتًا عامًا في:
- `~/.claude/skills/arabic-writing` (Claude Code)
- `~/.agents/skills/arabic-writing` (المجلد المشترك الذي تقرؤه أدوات متوافقة مع المعيار)

| الأمر | الوظيفة |
|---|---|
| `npx arabic-writing-skill --project` | تثبيت داخل المشروع الحالي فقط |
| `npx arabic-writing-skill --agent claude` | تثبيت لوكيل واحد (`claude` أو `agents`) |
| `npx arabic-writing-skill --dir <path>` | تثبيت في مجلد مخصص (لوكيل يقرأ من مسار آخر) |
| `npx arabic-writing-skill list` | عرض أماكن التثبيت |
| `npx arabic-writing-skill uninstall` | إزالة المهارة |

يمكن أيضًا تثبيته عامًّا: `npm install -g arabic-writing-skill` ثم `arabic-writing-skill`.

أو تشغيله مباشرة من GitHub دون انتظار النشر على npm:
```bash
npx github:a-khalid/arabic-writing-skill
```

### الطريقة ٣: إضافة Claude Code (Plugin)
```bash
/plugin marketplace add a-khalid/arabic-writing-skill
```
```bash
/plugin install arabic-writing@arabic-writing-skill
```

### الطريقة ٤: يدويًّا
```bash
cp -r skills/arabic-writing ~/.claude/skills/
```

### Claude.ai
اضغط مجلد `skills/arabic-writing` في ملف zip، ثم ارفعه من **Settings ← Capabilities ← Skills**.

### نماذج أخرى (ChatGPT، أو API)
محتوى `SKILL.md` ومجلد `references/` نصوص Markdown عادية، ويمكن استعمالها تعليماتِ نظام (system prompt) لأي نموذج.

> بعد التثبيت أعد تشغيل الوكيل لتظهر المهارة.

## التجربة

جُرّبت المهارة على ١٢ حالة، مع المهارة وبدونها، على Claude Opus 5.5:

| المعيار | مع المهارة | بدونها |
|---|---|---|
| التصحيحات المطلوبة | ١٢/١٢ | ١٢/١٢ |
| عدم فرض «الأفصح» على الكاتب | ✓ | ✗ |
| عدم إضافة معانٍ ليست في الأصل | ✓ | ✗ |
| الإيجاز في الصياغة البلاغية | ✓ | ✗ |
| ثبات صيغة المخرجات | ✓ | ✗ |

النموذج القوي يعرف القواعد الأساسية، وقيمة المهارة ظهرت في **الانضباط واحترام صوت الكاتب**. التفاصيل الكاملة وما عُدّل بعد التجربة في [`evals/RESULTS.md`](evals/RESULTS.md).

لإعادة التجربة، اتبع [`evals/README.md`](evals/README.md).

## الاستعمال
اكتب طلبك بشكل طبيعي:
- «دقق هذا النص: ...»
- «راجع تركيب هذه الفقرة»
- «أعد صياغة هذه الرسالة بأسلوب رسمي بليغ»
- «اكتب تهنئة بالنجاح بأسلوب أدبي»

## الفحص الآلي
يحتوي المشروع على سكربت بسيط بلا أي اعتماديات، يفحص المسافات وعلامات الترقيم والأخطاء الإملائية المتكررة:
```bash
python3 skills/arabic-writing/scripts/check_text.py file.txt
```

## هيكل المشروع
```
skills/arabic-writing/
├── SKILL.md                 التعليمات الأساسية وصيغة المخرجات
├── references/
│   ├── spelling.md          الإملاء
│   ├── grammar.md           النحو
│   ├── punctuation.md       الترقيم
│   ├── common-errors.md     الأخطاء الشائعة والأساليب المترجمة
│   ├── structure.md         مراجعة التركيب
│   └── rhetoric.md          الصياغة البلاغية
└── scripts/check_text.py    الفحص الآلي
evals/
├── cases.json               حالات الاختبار
└── RESULTS.md               نتائج التجربة
bin/install.js               مثبّت npm
.claude-plugin/              ملفات إضافة Claude Code
```

## المساهمة
المساهمات مرحب بها؛ اقرأ [CONTRIBUTING.md](CONTRIBUTING.md).

## الترخيص
[MIT](LICENSE)
