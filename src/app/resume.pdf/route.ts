import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, RESUME_SKILLS } from "@/lib/projects";

export const runtime = "nodejs";
export const dynamic = "force-static";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN_X = 54;
const START_Y = 738;
const LINE_HEIGHT = 13;
const BODY_SIZE = 9;
const TITLE_SIZE = 20;
const SECTION_SIZE = 11;

type PdfLine = {
  text: string;
  size?: number;
  bold?: boolean;
  gapBefore?: number;
};

function ascii(value: string) {
  return value
    .replace(/[\u2022\u00B7]/g, "-")
    .replace(/\u2192/g, "->")
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/\u00D7/g, "x")
    .replace(/[^\x20-\x7E\n]/g, "");
}

function escapePdfText(value: string) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text: string, maxChars = 92) {
  const words = ascii(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function section(title: string): PdfLine[] {
  return [{ text: title.toUpperCase(), size: SECTION_SIZE, bold: true, gapBefore: 10 }];
}

function bullet(text: string): PdfLine[] {
  return wrapText(text, 96).map((line, index) => ({
    text: index === 0 ? `- ${line}` : `  ${line}`,
  }));
}

function buildResumeLines(): PdfLine[] {
  const lines: PdfLine[] = [
    { text: PROFILE.name, size: TITLE_SIZE, bold: true },
    {
      text: `${PROFILE.phone} | ${PROFILE.email} | github.com/saurabhdotdev | ${PROFILE.location}`,
      gapBefore: 3,
    },
    {
      text: PROFILE.role,
      bold: true,
      gapBefore: 7,
    },
    ...wrapText(PROFILE.headline, 100).map((text) => ({ text })),
    ...section("Experience"),
  ];

  EXPERIENCE.forEach((experience) => {
    lines.push({
      text: `${experience.company} - ${experience.title}`,
      bold: true,
      gapBefore: 4,
    });
    lines.push({
      text: `${experience.location ?? ""} | ${experience.start} - ${experience.end}`,
    });
    experience.bullets.forEach((item) => lines.push(...bullet(item)));
  });

  lines.push(...section("Selected Projects"));
  PROJECTS.slice(0, 5).forEach((project) => {
    lines.push({ text: project.title, bold: true, gapBefore: 4 });
    lines.push(...wrapText(project.description, 96).map((text) => ({ text })));
    project.outcomes?.slice(0, 2).forEach((item) => lines.push(...bullet(item)));
  });

  lines.push(...section("Education"));
  EDUCATION.forEach((education) => {
    lines.push({
      text: `${education.school} - ${education.degree}`,
      bold: true,
      gapBefore: 4,
    });
    lines.push({ text: `${education.location} | ${education.period}` });
  });

  lines.push(...section("Skills"));
  Object.entries(RESUME_SKILLS).forEach(([group, skills]) => {
    lines.push(...wrapText(`${group}: ${skills.join(", ")}`, 100).map((text) => ({ text })));
  });

  return lines;
}

function linesToPages(lines: PdfLine[]) {
  const pages: PdfLine[][] = [[]];
  let y = START_Y;

  lines.forEach((line) => {
    const gap = line.gapBefore ?? 0;

    if (y - gap < 54) {
      pages.push([]);
      y = START_Y;
    }

    y -= gap;
    pages[pages.length - 1].push(line);
    y -= LINE_HEIGHT;
  });

  return pages;
}

function pageContent(lines: PdfLine[]) {
  let y = START_Y;
  const commands: string[] = ["BT"];

  lines.forEach((line) => {
    y -= line.gapBefore ?? 0;
    const font = line.bold ? "F2" : "F1";
    const size = line.size ?? BODY_SIZE;
    commands.push(`/${font} ${size} Tf`);
    commands.push(`1 0 0 1 ${MARGIN_X} ${y} Tm`);
    commands.push(`(${escapePdfText(line.text)}) Tj`);
    y -= LINE_HEIGHT;
  });

  commands.push("ET");
  return commands.join("\n");
}

function buildPdf() {
  const pages = linesToPages(buildResumeLines());
  const objects: string[] = [];
  const pageObjectIds: number[] = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  pages.forEach((pageLines) => {
    const content = pageContent(pageLines);
    const contentObjectId = objects.length + 1;
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);

    const pageObjectId = objects.length + 1;
    pageObjectIds.push(pageObjectId);
    objects.push(
      [
        "<< /Type /Page",
        "/Parent 2 0 R",
        `/MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}]`,
        "/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >>",
        `/Contents ${contentObjectId} 0 R`,
        ">>",
      ].join(" "),
    );
  });

  objects[1] = `<< /Type /Pages /Kids [${pageObjectIds
    .map((id) => `${id} 0 R`)
    .join(" ")}] /Count ${pageObjectIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

export function GET() {
  return new Response(buildPdf(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="saurabh-kulkarni-resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
