#!/usr/bin/env node
/**
 * Ömer Tekin Mühendislik ve İnşaat — site görseli üretim scripti.
 *
 * Bu script YALNIZCA geliştirme zamanında, yerel makinede elle çalıştırılır.
 * Üretilen web sitesi (GitHub Pages) hiçbir zaman OpenAI API'sine istek atmaz;
 * bu script sadece /public/generated altına statik .webp dosyaları üretir.
 *
 * Kullanım:
 *   npm run generate:images                # eksik olan görselleri üretir
 *   npm run generate:images -- --dry-run    # hiçbir API çağrısı yapmadan planı gösterir
 *   npm run generate:images -- --force      # zaten var olan üretilmiş görselleri de yeniden üretir
 *   npm run generate:images -- --only=merkez-konutlari  # yalnızca belirli proje(ler)i işler
 *
 * Gereksinim: OPENAI_API_KEY ortam değişkeni (.env.local içinde, asla commit edilmez).
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const MANIFEST_PATH = path.join(ROOT, "data", "generated-images.json");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const ONLY = args
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length)
  ?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// gpt-image-2.5-sunburst: premium, tighter-control image generation/editing model.
// Ortam değişkeni ile override edilebilir (ör. daha hızlı/ucuz "flare" varyantı için).
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2.5-sunburst";

const BASE_STYLE =
  "Photorealistic premium architectural photography for a modern Turkish engineering and construction company, realistic contemporary architecture in the Muğla / Aegean region near Yatağan, dark charcoal stone and metal details, natural warm materials, restrained landscaping, professional architectural photography, realistic structural proportions, elegant but credible construction quality (not an ultra-luxury mega-developer), cinematic natural lighting, high detail, no text, no logos, no watermark, no signage, people only as small contextual background figures if any, never posed or looking at camera.";

/**
 * Her proje için tutarlı bir "reference" (kapak) görseli üzerinden galeri
 * görselleri üretilir (images.edit ile), böylece aynı projenin farklı
 * fotoğrafları FARKLI binalar gibi görünmez. Kapak ise images.generate ile
 * sıfırdan üretilir.
 *
 * @typedef {Object} ImageSlot
 * @property {string} id - Manifest ve idempotency anahtarı.
 * @property {string} project - İlgili proje slug'ı (raporlama/gruplama için).
 * @property {string} file - /public köküne göre çıktı yolu.
 * @property {"generate"|"edit"} mode - Sıfırdan üretim mi, referanslı düzenleme mi.
 * @property {string} [referenceFile] - mode "edit" ise, /public köküne göre referans görsel.
 * @property {string} usage - Kullanıldığı sayfa/bölüm (insan-okunur açıklama).
 * @property {string} prompt
 * @property {"1024x1024"|"1536x1024"|"1024x1536"} size
 * @property {"low"|"medium"|"high"} quality
 */

/** @type {ImageSlot[]} */
const slots = [
  // ---------------------------------------------------------------------
  // Modern Villa — kapak görseli GERÇEK ve mevcut (public/modern-villa.png).
  // Galeri görselleri o gerçek fotoğraf REFERANS ALINARAK (images.edit)
  // üretilir; böylece aynı villa farklı açılardan gösterilir.
  // ---------------------------------------------------------------------
  {
    id: "modern-villa-gallery-01",
    project: "modern-villa",
    file: "generated/projects/modern-villa/gallery-01.webp",
    mode: "edit",
    referenceFile: "modern-villa.png",
    usage: "Modern Villa proje detay galerisi — 01 giriş cephesi (gündüz)",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show the same contemporary detached villa from its entrance facade, daytime golden-hour light, same light natural stone and dark charcoal metal cladding, same minimal landscaping with olive and cypress trees, same architectural proportions and window pattern as the reference image.`,
  },
  {
    id: "modern-villa-gallery-02",
    project: "modern-villa",
    file: "generated/projects/modern-villa/gallery-02.webp",
    mode: "edit",
    referenceFile: "modern-villa.png",
    usage: "Modern Villa proje detay galerisi — 02 havuz/bahçe perspektifi",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show the same villa's pool and garden from a lower terrace-level perspective at dusk, same infinity pool, same warm interior lighting glowing through the glass facade, same material palette as the reference image, calm negative space in the sky for potential text overlay.`,
  },
  {
    id: "modern-villa-gallery-03",
    project: "modern-villa",
    file: "generated/projects/modern-villa/gallery-03.webp",
    mode: "edit",
    referenceFile: "modern-villa.png",
    usage: "Modern Villa proje detay galerisi — 03 arka teras / detay",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show a closer architectural detail of the same villa's rear terrace: cantilevered concrete roof, dark metal balustrade, built-in outdoor lighting, same stone cladding and same twilight lighting mood as the reference image.`,
  },

  // ---------------------------------------------------------------------
  // Merkez Konutları — devam eden, çok bloklu şehir merkezi konut projesi.
  // ---------------------------------------------------------------------
  {
    id: "merkez-konutlari-cover",
    project: "merkez-konutlari",
    file: "generated/projects/merkez-konutlari/cover.webp",
    mode: "generate",
    usage: "Merkez Konutları — proje kartı ve detay sayfası kapak görseli",
    size: "1536x1024",
    quality: "high",
    prompt: `${BASE_STYLE} A multi-block modern residential construction project rising in a mid-size Turkish city center, seen from a slightly elevated street viewpoint, exposed reinforced concrete structural frame on the nearest block with scaffolding, one tower crane, overcast natural daylight, realistic urban context with mid-rise buildings in the background, calm negative space on the left third of the frame for text overlay.`,
  },
  {
    id: "merkez-konutlari-gallery-01",
    project: "merkez-konutlari",
    file: "generated/projects/merkez-konutlari/gallery-01.webp",
    mode: "edit",
    referenceFile: "generated/projects/merkez-konutlari/cover.webp",
    usage: "Merkez Konutları galeri — 01 inşaat sahası genel görünüm",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show the same multi-block construction site from a different, closer ground-level angle, same tower crane and same concrete structural frame, workers with hard hats small and contextual in the background, overcast daylight matching the reference image.`,
  },
  {
    id: "merkez-konutlari-gallery-02",
    project: "merkez-konutlari",
    file: "generated/projects/merkez-konutlari/gallery-02.webp",
    mode: "edit",
    referenceFile: "generated/projects/merkez-konutlari/cover.webp",
    usage: "Merkez Konutları galeri — 02 yapısal uygulama detayı",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} A close architectural detail shot on the same construction site: formwork and rebar of a concrete column/slab edge in progress, realistic construction materials stacked nearby, overcast daylight matching the reference image, no readable signage.`,
  },

  // ---------------------------------------------------------------------
  // Park Yaşam — devam eden, yeşil alan ağırlıklı aile konut projesi.
  // ---------------------------------------------------------------------
  {
    id: "park-yasam-cover",
    project: "park-yasam",
    file: "generated/projects/park-yasam/cover.webp",
    mode: "generate",
    usage: "Park Yaşam — proje kartı ve detay sayfası kapak görseli",
    size: "1536x1024",
    quality: "high",
    prompt: `${BASE_STYLE} A family-oriented residential complex construction site surrounded by mature green landscaping and young planted trees, low-rise apartment blocks with concrete structural frame partially completed on the right, soft overcast daylight, restrained realistic planting (no exotic or unrealistic vegetation), calm negative space on the left third of the frame for text overlay.`,
  },
  {
    id: "park-yasam-gallery-01",
    project: "park-yasam",
    file: "generated/projects/park-yasam/gallery-01.webp",
    mode: "edit",
    referenceFile: "generated/projects/park-yasam/cover.webp",
    usage: "Park Yaşam galeri — 01 inşaat ilerleyişi",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show the same residential complex construction from a different angle further along the site, same concrete structural frame and same landscaping style, overcast daylight matching the reference image.`,
  },
  {
    id: "park-yasam-gallery-02",
    project: "park-yasam",
    file: "generated/projects/park-yasam/gallery-02.webp",
    mode: "edit",
    referenceFile: "generated/projects/park-yasam/cover.webp",
    usage: "Park Yaşam galeri — 02 peyzaj / ortak yaşam alanı",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show a completed landscaped common courtyard area belonging to the same residential complex: walking paths, restrained realistic planting, simple modern outdoor seating, soft daylight matching the reference image, no people posed at camera.`,
  },

  // ---------------------------------------------------------------------
  // Ofis Projesi — tamamlanmış, ticari/ofis binası.
  // ---------------------------------------------------------------------
  {
    id: "ofis-projesi-cover",
    project: "ofis-projesi",
    file: "generated/projects/ofis-projesi/cover.webp",
    mode: "generate",
    usage: "Ofis Projesi — proje kartı ve detay sayfası kapak görseli",
    size: "1536x1024",
    quality: "high",
    prompt: `${BASE_STYLE} A completed modern commercial office building exterior, clean rectilinear massing, dark charcoal metal cladding combined with a glass curtain wall facade, restrained entrance landscaping, daytime with soft natural light, credible mid-size local commercial architecture (not a corporate mega-tower), calm negative space on the left third of the frame for text overlay.`,
  },
  {
    id: "ofis-projesi-gallery-01",
    project: "ofis-projesi",
    file: "generated/projects/ofis-projesi/gallery-01.webp",
    mode: "edit",
    referenceFile: "generated/projects/ofis-projesi/cover.webp",
    usage: "Ofis Projesi galeri — 01 farklı açıdan dış cephe",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show the same commercial office building from a different corner viewpoint, same glass curtain wall and dark metal cladding, same entrance landscaping, daytime light matching the reference image.`,
  },
  {
    id: "ofis-projesi-gallery-02",
    project: "ofis-projesi",
    file: "generated/projects/ofis-projesi/gallery-02.webp",
    mode: "edit",
    referenceFile: "generated/projects/ofis-projesi/cover.webp",
    usage: "Ofis Projesi galeri — 02 giriş lobisi (iç mekan)",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} An interior view of the same office building's entrance lobby: warm indirect lighting, natural stone and dark metal details continuing from the exterior material palette, simple modern reception area, no visible signage or readable text, no people posed at camera.`,
  },

  // ---------------------------------------------------------------------
  // Yeni Yaşam Konutları — tamamlanmış, aile odaklı konut projesi.
  // ---------------------------------------------------------------------
  {
    id: "yeni-yasam-konutlari-cover",
    project: "yeni-yasam-konutlari",
    file: "generated/projects/yeni-yasam-konutlari/cover.webp",
    mode: "generate",
    usage: "Yeni Yaşam Konutları — proje kartı ve detay sayfası kapak görseli",
    size: "1536x1024",
    quality: "high",
    prompt: `${BASE_STYLE} A completed mid-rise apartment residence exterior at dusk/blue hour, warm interior light glowing through balcony glazing, light natural stone facade with dark metal balcony railings, restrained mature landscaping at ground level, credible local residential scale (4-6 storeys, not a skyscraper), calm negative space on the left third of the frame for text overlay.`,
  },
  {
    id: "yeni-yasam-konutlari-gallery-01",
    project: "yeni-yasam-konutlari",
    file: "generated/projects/yeni-yasam-konutlari/gallery-01.webp",
    mode: "edit",
    referenceFile: "generated/projects/yeni-yasam-konutlari/cover.webp",
    usage: "Yeni Yaşam Konutları galeri — 01 farklı açıdan dış cephe",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show the same apartment residence from a different corner angle, same facade material and same balcony style, same dusk/blue hour lighting matching the reference image.`,
  },
  {
    id: "yeni-yasam-konutlari-gallery-02",
    project: "yeni-yasam-konutlari",
    file: "generated/projects/yeni-yasam-konutlari/gallery-02.webp",
    mode: "edit",
    referenceFile: "generated/projects/yeni-yasam-konutlari/cover.webp",
    usage: "Yeni Yaşam Konutları galeri — 02 ortak sosyal alan",
    size: "1536x1024",
    quality: "medium",
    prompt: `${BASE_STYLE} Show a ground-level shared social/garden area belonging to the same residence, simple modern seating and restrained realistic planting, warm evening lighting matching the reference image, no people posed at camera.`,
  },
];

function log(...args) {
  console.log(...args);
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeManifest(entries) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(entries, null, 2) + "\n", "utf-8");
}

function upsertManifestEntry(manifest, entry) {
  const index = manifest.findIndex((item) => item.id === entry.id);
  if (index === -1) {
    manifest.push(entry);
  } else {
    manifest[index] = entry;
  }
}

async function main() {
  const selected = slots.filter((slot) => !ONLY || ONLY.includes(slot.project));

  if (selected.length === 0) {
    log("Seçilen kritere uyan görsel bulunamadı (--only filtresini kontrol edin).");
    return;
  }

  const pending = [];
  const skipped = [];

  for (const slot of selected) {
    const outputPath = path.join(PUBLIC_DIR, slot.file);
    const exists = fs.existsSync(outputPath);
    if (exists && !FORCE) {
      skipped.push(slot);
    } else {
      pending.push(slot);
    }
  }

  log(`\nÖmer Tekin site görseli üretim planı`);
  log(`Model: ${MODEL}`);
  log(`Toplam slot: ${selected.length} | Zaten mevcut (atlandı): ${skipped.length} | Üretilecek: ${pending.length}\n`);

  if (skipped.length > 0) {
    log("Zaten mevcut (--force ile yeniden üretilebilir):");
    for (const slot of skipped) {
      log(`  - [${slot.project}] ${slot.file}`);
    }
    log("");
  }

  if (pending.length === 0) {
    log("Üretilecek yeni görsel yok. Her şey tamam.");
    return;
  }

  log(`${DRY_RUN ? "[DRY RUN] " : ""}Üretilecek görseller:`);
  for (const slot of pending) {
    log(`\n— ${slot.id}`);
    log(`  Proje       : ${slot.project}`);
    log(`  Kullanım    : ${slot.usage}`);
    log(`  Mod         : ${slot.mode}${slot.referenceFile ? ` (referans: ${slot.referenceFile})` : ""}`);
    log(`  Dosya       : public/${slot.file}`);
    log(`  Boyut       : ${slot.size} · Kalite: ${slot.quality}`);
    log(`  Prompt      : ${slot.prompt}`);
  }
  log("");

  if (DRY_RUN) {
    log("Dry run tamamlandı. Gerçek üretim için --dry-run bayrağını kaldırın.");
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    log("HATA: OPENAI_API_KEY ortam değişkeni tanımlı değil.");
    log("Bu script yalnızca yerel makinede, .env.local içindeki anahtar ile çalışır.");
    log("Gerçek görsel üretimi için lütfen .env.local dosyasına OPENAI_API_KEY ekleyin.");
    process.exitCode = 1;
    return;
  }

  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI();
  const manifest = readManifest();

  for (const slot of pending) {
    const outputPath = path.join(PUBLIC_DIR, slot.file);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    log(`Üretiliyor: ${slot.id} ...`);
    try {
      let result;
      if (slot.mode === "edit") {
        const referencePath = path.join(PUBLIC_DIR, slot.referenceFile);
        if (!fs.existsSync(referencePath)) {
          throw new Error(
            `Referans görsel bulunamadı: public/${slot.referenceFile}. Bu proje için önce kapak görselini üretin.`,
          );
        }
        result = await openai.images.edit({
          model: MODEL,
          image: fs.createReadStream(referencePath),
          prompt: slot.prompt,
          size: slot.size,
          quality: slot.quality,
          output_format: "webp",
          output_compression: 85,
        });
      } else {
        result = await openai.images.generate({
          model: MODEL,
          prompt: slot.prompt,
          size: slot.size,
          quality: slot.quality,
          output_format: "webp",
          output_compression: 85,
        });
      }

      const b64 = result.data?.[0]?.b64_json;
      if (!b64) {
        throw new Error("API yanıtında b64_json bulunamadı.");
      }

      fs.writeFileSync(outputPath, Buffer.from(b64, "base64"));
      log(`  ✓ Kaydedildi: public/${slot.file}`);

      upsertManifestEntry(manifest, {
        id: slot.id,
        file: slot.file,
        usage: slot.usage,
        project: slot.project,
        mode: slot.mode,
        referenceFile: slot.referenceFile ?? null,
        prompt: slot.prompt,
        model: MODEL,
        size: slot.size,
        quality: slot.quality,
        outputFormat: "webp",
        outputCompression: 85,
        generatedAt: new Date().toISOString(),
      });
      writeManifest(manifest);
    } catch (error) {
      log(`  ✗ Hata: ${error?.message ?? error}`);
      process.exitCode = 1;
    }
  }

  log("\nÜretim tamamlandı. Sonuçları /data/generated-images.json içinde görebilirsiniz.");
  log("Yeni görselleri ilgili projelere bağlamak için data/projects.ts dosyasını güncellemeyi unutmayın.");
}

main();
